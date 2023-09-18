import React, { useEffect, useState } from "react";
import "./HeaderStyle.css";
import Accounts from "./Accounts";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import logoIcon from "..//../img/logoIcon.svg";
import userA from "..//../img/userA.svg";

const HeaderBar = ({ toggleSidebar, sidebarVisible, user }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isUserVisible, setUserVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setPopupOpen(true);
  };

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    setIsUserLoggedIn(isUserLoggedIn);
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout actions here
    setIsUserLoggedIn(false);
  };

  return (
    <div className="headerBar">
      <div className="logo_icon_bar">
        <div className="humberger">
          <svg
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 50 50"
            style={{ cursor: "pointer" }}
          >
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
          </svg>
        </div>
        {/* // Logo copied from Sidebar component */}
        {/* {!sidebarVisible && ()} */}
        <div className="headerLogo">
          <img src={logoIcon} width="52" height="31" />
        </div>

        <div className="title-divider" />
        <div className="div-title">
          <div className="heading-free">Free Invoice Generator</div>
          <div className="link-by-zoho-invoice">by Leed</div>
        </div>
      </div>
      <div className="accountsIconText">
        {/* <div className="title-divider" /> */}
        {isUserLoggedIn ? (
          // If user is logged in, display user profile button {handleLogout} // onClick={openUserProfile}
          // <Link to={"/user-profile"} className="profileBtn">
          //   {"AR"}
          // </Link>
          <>
            <button
              className="profileBtn"
              onClick={() => {
                navigate("/user-profile", { state: { user: user } });
              }}
            >
              {"AR"}
            </button>
          </>
        ) : (
          // If user is not logged in, display login/register button
          <button className="loginBtn" onClick={handleLogin}>
            <span className="desktopDevice">Register / Login</span>
            <span className="mobileDevice">
              <img src={userA} width={30}></img>
            </span>
          </button>
        )}
        {isPopupOpen && (
          <Accounts
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
        )}
        {/* {setShowUserProfile && <UserProfile />} */}
        {/* Render other header components */}
      </div>
    </div>
  );
};

export default HeaderBar;
