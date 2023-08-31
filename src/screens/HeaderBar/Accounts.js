// LoginSignupPopup.js
import React, { useState } from "react";
import "./Account.css";
import instagram from "../../img/instagram.svg";
import facebook from "../../img/facebook.svg";
import google from "../../img/google.svg";
import mail from "../../img/mail.svg";
import passwordIcon from "../../img/passwordIcon.svg";
import closePopup from "../../img/closePopup.svg";
import recoverPass from "../../img/recoverPass.svg";
import userA from "../../img/userA.svg";

const Accounts = ({ isOpen, onClose, setIsUserLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const [loginResponse, setLoginResponse] = useState({});
  const handleLoginSubmit = async (e) => {
    console.log("Login function triggered");
    e.preventDefault();
    try {
      const response = await fetch(
        "https://invoice-generator.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const loginData = await response.json();
      if (response.ok) {
        setIsUserLoggedIn(true);
        setLoginResponse(loginData);
        onClose();
        const body = JSON.stringify({
          email,
          password,
        });
        console.log(body);
        console.log(loginData);
      } else {
        console.log("Login Error:", loginData.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  const [signupResponse, setSignupResponse] = useState({});

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const response = await fetch(
        "https://invoice-generator.up.railway.app/api/user/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phoneNumber: "111111111111",
          }),
        }
      );

      const signupData = await response.json();
      setSignupResponse(signupData);
      if (response.ok) {
        console.log("Signup Success!");
        const body = JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        });
        console.log(signupData);
      } else {
        console.log("Signup Error:", signupData.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://invoice-generator.up.railway.app/api/user/forgetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: resetEmail }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResetMessage("Reset link sent to your email");
      } else {
        setResetMessage(data.error || "Error resetting password");
      }
    } catch (error) {
      console.error("Network Error:", error.message);
      setResetMessage("Network error. Please try again.");
    }
  };

  const [showReset, setShowReset] = useState(false);

  const toggleResetSection = () => {
    setShowReset((prevState) => !prevState);
    // setIsLogin(false);
    const classesToHide = ["hideOnReset"];
    classesToHide.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);

      // Apply the CSS property to hide the elements
      elements.forEach((element) => {
        element.style.display = "none";
      });
    });
  };
  const backToLogin = () => {
    setShowReset(false);
    const classesToHide = ["hideOnReset"];
    classesToHide.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((element) => {
        element.style.display = "block";
      });
    });
  };

  return (
    <div className={`accountPopup ${isOpen ? "open" : ""}`}>
      <button className="close" onClick={onClose}>
        <img src={closePopup} width="63" height="64" />
      </button>
      <div className="clearflex"></div>
      <div className="hideOnReset">
        <h2 className="accountTitle">{isLogin ? "Login" : "Signup"}</h2>
        <div className="accountsubtitle">
          {isLogin
            ? "Login to your account"
            : "Fill out the form to get started"}
        </div>
      </div>
      <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
        {!isLogin && (
          <div className="input-icons">
            <img src={userA} width="24" height="24" />
            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input-icons hideOnReset">
          <img src={mail} width="22" height="22" />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-icons hideOnReset">
          <img src={passwordIcon} width="24" height="24" />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <>
            <div className="input-icons">
              <img src={recoverPass} width="30" height="30" />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordMismatch && (
              <p style={{ color: "red" }}>Passwords do not match!</p>
            )}
          </>
        )}
        {/* Button for forgot password */}

        {isLogin ? (
          <p
            className="forgot hideOnReset"
            style={{ textAlign: "right" }}
            onClick={toggleResetSection}
          >
            Lost your password?
          </p>
        ) : (
          <p></p>
        )}

        {isLogin ? (
          <button className="LogSignBtn hideOnReset" type="submit">
            Login
          </button>
        ) : (
          <button className="LogSignBtn" type="submit">
            Signup
          </button>
        )}

        <div className="response-details">
          {/* {signupResponse.data?.name},{signupResponse.data?.email}, */}
          {isLogin ? (
            <p>{loginResponse.message}</p>
          ) : (
            <p>{signupResponse.message}</p>
          )}
        </div>
      </form>

      {/* Reset Form Starts */}
      <form onSubmit={handleResetRequest}>
        {isLogin ? (
          <div>
            {showReset && (
              <div>
                <div style={{ marginBottom: "20px" }}>
                  <h2 className="accountTitle">Recover Password</h2>
                  <div className="accountsubtitle">
                    Enter your email address and an email with instructions will
                    be sent to you.
                  </div>
                </div>
                <div className="input-icons">
                  <img src={mail} width="24" height="24" />
                  <input
                    type="email"
                    placeholder="Enter Email"
                    required
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                {/* Button for reset used in upper form */}
                <button className="LogSignBtn" type="submit">
                  Send Email
                </button>
                <p>{resetMessage}</p>
                <p className="remember">
                  Remember your password?{" "}
                  <span className="forgot" onClick={backToLogin}>
                    Login
                  </span>
                </p>
              </div>
            )}
          </div>
        ) : (
          <p></p>
        )}
      </form>
      {/* Function Ends */}

      <div className="hideOnReset">
        <p className="dividerText" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? (
            <>
              Don’t have an account? <span>Signup</span>
            </>
          ) : (
            <>
              Already have an account? <span>Login</span>
            </>
          )}
        </p>
        <p className="dividerText">or</p>
        <div class="divider"></div>

        <div className="socialLogins">
          <div className="socials">
            <div className="google">
              <img src={google} width="24" height="24" />
            </div>
          </div>
          <div className="socials">
            <div className="facebook">
              <img src={facebook} width="24" height="24" />
            </div>
          </div>
          <div className="socials">
            <div className="instagram">
              <img src={instagram} width="24" height="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
