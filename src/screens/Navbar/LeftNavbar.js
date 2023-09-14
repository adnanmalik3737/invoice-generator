// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import logout from "../../img/logout.svg";
import billingIcon from "../../img/billingIcon.svg";
import proIcon from "../../img/proIcon.svg";
import companyLogo from "../../img/companyLogo.svg";
import axios from "axios";

function Sidebar({ isVisible }) {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  // Logout Function
  const handleLogout = async () => {
    try {
      const logresponse = await axios.get(`${baseUrl}/api/auth/logout`);
      if (logresponse.data.message === "Logged out successfully!") {
        // Reset user data and login state
        // setUser(null);
        // setIsUserLoggedIn(false);
        // setLoginResponse({}); // Clear the login response
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
  return (
    <div className="sidebar" style={{ display: isVisible ? "none" : "block" }}>
      <div className="navBarItems">
        <div className="appLogo">
          <img src={companyLogo}></img>
          <p>Company Logo Here </p>
        </div>
        <div className="navlist">
          <span>
            <img src={billingIcon}></img>
          </span>
          <NavItem
            title="Billing"
            subItems={["Create Invoice", "History", "User Profile"]}
          />
        </div>
        <div className="navlist">
          <span>
            <img src={companyLogo} width={24}></img>
          </span>
          <NavItem title="Home" subItems={["Home"]} />
        </div>
        <div className="navlist">
          <span>
            <img src={proIcon}></img>
          </span>
          <NavItem
            title="Pro Features"
            subItems={[
              "PDF Templates",
              "Attach with Different Websites",
              "Professional Business Use",
            ]}
          />
        </div>
      </div>
      <div className="logoutBtn" onClick={handleLogout}>
        <span className="logoutText">
          <img src={logout} width="24px" height="24px"></img>
          Logout
        </span>
      </div>
    </div>
  );
}

function NavItem({ title, subItems }) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="nav-item">
      <div className="major-items" onClick={toggleDropdown}>
        {title}
      </div>
      {isDropdownOpen && (
        <div className="Navdropdown">
          {subItems.map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className="sub-items"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
