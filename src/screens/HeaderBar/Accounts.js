// LoginSignupPopup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import instagram from "../../img/instagram.svg";
import facebook from "../../img/facebook.svg";
import google from "../../img/google.svg";
import mail from "../../img/mail.svg";
import passwordIcon from "../../img/passwordIcon.svg";
import closePopup from "../../img/closePopup.svg";
import recoverPass from "../../img/recoverPass.svg";
import userA from "../../img/userA.svg";
import UserProfile from "./UserProfile";

axios.defaults.withCredentials = true;

const Accounts = ({ isOpen, onClose, setIsUserLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // const [user, setUser] = useState(null);
  // const [loginResponse, setLoginResponse] = useState({});

  const [user, setUser] = useState(null);
  const [loginResponse, setLoginResponse] = useState({});
  const [logoutResponse, setLogoutResponse] = useState({});

  const handleLoginSubmit = async (e) => {
    console.log("Login function triggered");
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setLoginResponse(response.data);
        console.log("User data:", response.data);
        localStorage.setItem("isUserLoggedIn", "true");
        // fetchUserData();  Fetch user data after successful login
        // onClose();
        const body = JSON.stringify({
          email,
          password,
        });
        console.log(body);
        console.log(response.data);
      } else {
        console.log("Login Error:", response.data.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  // Google Login Function
  const handleGoogleLogin = async (e) => {
    console.log("Login function triggered");
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}api/auth/google`);
      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setLoginResponse(response.data);
        console.log("User data:", response.data);
        // fetchUserData();  Fetch user data after successful login
        // onClose();
        const body = JSON.stringify({
          email,
          password,
        });
        console.log(body);
        console.log(response.data);
      } else {
        console.log("Login Error:", response.data.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  // Facebook Login Function
  const handleFbLogin = async (e) => {
    console.log("Login function triggered");
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl}api/auth/facebook`);
      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setLoginResponse(response.data);
        console.log("User data:", response.data);
        // fetchUserData();  Fetch user data after successful login
        // onClose();
        const body = JSON.stringify({
          email,
          password,
        });
        console.log(body);
        console.log(response.data);
      } else {
        console.log("Login Error:", response.data.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    try {
      const logresponse = await axios.get(`${baseUrl}api/auth/logout`);
      if (logresponse.data.message === "Logged out successfully!") {
        // Reset user data and login state
        setUser(null);
        setIsUserLoggedIn(false);
        setLoginResponse({}); // Clear the login response
        console.log(logresponse.data.message);
        localStorage.removeItem("isUserLoggedIn");
        // onClose();
      } else {
        console.log("Logout Error:", logresponse.data);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get User data API with AXIOS Method
  async function fetchUserData() {
    try {
      const response = await axios.get(`${baseUrl}api/user/get`, {
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      if (response.status === 200) {
        const userData = response.data;
        setUser(userData);
        console.log("Fetched user data:", userData);
      } else {
        console.error("Failed to fetch user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Signup User Function

  const [signupResponse, setSignupResponse] = useState({});

  // Signup Function using AXIOS Method
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}api/user/create`,
        {
          name,
          email,
          password,
          phoneNumber: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (typeof response.data.message === "string") {
        setSignupResponse(response.data.message);
      } else {
        setSignupResponse("An unexpected error occurred.");
      }

      if (response.data.code === 201) {
        console.log(response.data);
        const body = JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        });
      } else if (response.data.code === 400) {
        console.log("Signup Error:", response.data.message);
      } else {
        if (
          response.data.errors &&
          response.data.errors.length > 0 &&
          typeof response.data.errors[0].msg === "string"
        ) {
          console.log("Signup Error:", response.data.errors[0].msg);
          setSignupResponse(response.data.errors[0].msg);
        } else {
          console.log("Unexpected Error format:", response.data.errors);
          setSignupResponse(response.data.message);
          // Handle unexpected error formats or set a default error message
        }
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  // Timeout messages
  const [showApiResponse, setShowApiResponse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApiResponse(false);
    }, 10000);

    // Cleanup function to clear the timeout if the component unmounts
    // return () => clearTimeout(timer);
  }, []);

  // Reset Functionality using Axios Method
  const handleResetRequest = async (e) => {
    e.preventDefault();
    console.log("forgot Email triggered");
    try {
      const response = await axios.post(
        `${baseUrl}api/user/forgetpassword`,
        {
          email: resetEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResetMessage("Reset link sent to your email");
      } else {
        setResetMessage(response.data.error || "Error resetting password");
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

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, []);

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
          <>
            <button className="LogSignBtn hideOnReset" type="submit">
              Login
            </button>
          </>
        ) : (
          <button className="LogSignBtn" type="submit">
            Signup
          </button>
        )}
        {/* {showApiResponse && ()} */}
        <div className="response-details">
          {isLogin ? (
            <p>{loginResponse.message}</p>
          ) : (
            typeof signupResponse === "string" && <p>{signupResponse}</p>
          )}
        </div>
      </form>

      {isLogin &&
      loginResponse &&
      loginResponse.message === "Authentication successful" ? (
        <>
          <div className="getLogout">
            <button className=" hideOnReset" onClick={fetchUserData}>
              Get User Data
            </button>

            <button className=" hideOnReset" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <UserProfile
            user={loginResponse.user}
            fetchUserData={fetchUserData}
          />
        </>
      ) : null}

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
        <div className="divider"></div>

        <div className="socialLogins">
          <div className="socials">
            <div className="google" onClick={handleGoogleLogin}>
              <img src={google} width="24" height="24" />
            </div>
          </div>
          <div className="socials">
            <div className="facebook" onClick={handleFbLogin}>
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
