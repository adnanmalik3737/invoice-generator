// LoginSignupPopup.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";
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

const Accounts = ({ isOpen, onClose, setIsUserLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // const [user, setUser] = useState(null);

  // const [loginResponse, setLoginResponse] = useState({});

  // // Fetch Methods Removed

  // // Login Function with Axios Method

  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  // const handleLoginSubmit = async (e) => {
  //   console.log("Login function triggered");
  //   e.preventDefault();

  //   try {
  //     const response = await axios
  //       .post("https://invoice-generator.up.railway.app/api/auth/login", {
  //         email,
  //         password,
  //       })
  //       .then((response) => {
  //         setCookie("user", response.data, {
  //           path: "/",
  //         });
  //       });

  //     if (response.status === 200) {
  //       setIsUserLoggedIn(true);
  //       setLoginResponse(response.data);
  //       console.log("User data:", response.data);

  //       console.log("Data fetched");
  //       // fetchUserData(); // Invoke the fetchUserData callback

  //       // onClose();
  //       const body = JSON.stringify({
  //         email,
  //         password,
  //       });
  //       console.log(body);
  //       console.log(response.data);
  //     } else {
  //       console.log("Login Error:", response.data.error);
  //     }
  //   } catch (error) {
  //     console.error("Network Error:", error.message);
  //   }
  // };

  // const handleLoginSuccess = (userData) => {
  //   // Save user data in cookie
  //   setCookie("user", JSON.stringify(userData), { path: "/" });
  // };

  // // When user logs out
  // const handleLogout = () => {
  //   removeCookie("user", { path: "/" });
  //   // Other logout logic here...
  // };

  // // Get User data API with AXIOS Method
  // async function fetchUserData() {
  //   try {
  //     const response = await axios.get(
  //       "https://invoice-generator.up.railway.app/api/user/get",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const userData = response.data;
  //       setUser(userData); // Update state with user data
  //       console.log("Fetched user data:", userData);
  //       console.log("Response:", response.status);

  //       setLoginResponse({ ...loginResponse, user: userData });
  //     } else {
  //       console.error("Failed to fetch user data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // }

  // // Whenever you need to get user details from the cookie
  // const getUserDetailsFromCookie = () => {
  //   const userDetails = JSON.parse(cookies.user);
  //   return userDetails;
  // };

  const [user, setUser] = useState(null);
  const [loginResponse, setLoginResponse] = useState({});

  const handleLoginSubmit = async (e) => {
    console.log("Login function triggered");
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://invoice-generator.up.railway.app/api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // Ensure cookies (like the session ID) are sent with the request
        }
      );

      if (response.status === 200) {
        setIsUserLoggedIn(true);
        setLoginResponse(response.data);
        console.log("User data:", response.data);
        // fetchUserData();  Fetch user data after successful login
        onClose();
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

  // When user logs out
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://invoice-generator.up.railway.app/api/auth/logout"
        // {},
        // { withCredentials: true }
      );
      // Other logout logic here...
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get User data API with AXIOS Method
  async function fetchUserData() {
    try {
      const response = await axios.get(
        "https://invoice-generator.up.railway.app/api/user/get",
        {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true, // Ensure cookies (like the session ID) are sent with the request
        }
      );

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
        "https://invoice-generator.up.railway.app/api/user/create",
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

      setSignupResponse(response.data);
      if (response.status === 200) {
        console.log("Signup Success!");
        const body = JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        });
        console.log(response.data);
      } else {
        console.log("Signup Error:", response.data.error);
      }
    } catch (error) {
      console.error("Network Error:", error.message);
    }
  };

  // Reset Functionality using Axios Method
  const handleResetRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://invoice-generator.up.railway.app/api/user/forgetpassword",
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

  // useEffect(() => {
  //   if (user) {
  //     fetchUserData();
  //   }
  // }, [user, fetchUserData]);

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

        <div className="response-details">
          {isLogin ? (
            <p>{loginResponse.message}</p>
          ) : (
            <p>{signupResponse.message}</p>
          )}
        </div>
      </form>

      {loginResponse &&
      loginResponse.message === "Authentication successful" ? (
        // <UserProfile user={loginResponse.user} fetchUserData={fetchUserData} />
        <button className=" hideOnReset" onClick={fetchUserData}>
          get
        </button>
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
