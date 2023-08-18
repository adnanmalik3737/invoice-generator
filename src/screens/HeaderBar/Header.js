import React from "react";
import "./HeaderStyle.css";

const HeaderBar = () => {
  return (
    <div className="headerBar">
      <div className="div-d-flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 50 50"
        >
          <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
        </svg>
        <div className="span-title-divider" />
        <div className="div-title">
          <div className="heading-free">Free Invoice Generator</div>
          <div className="link-by-zoho-invoice">by Leed</div>
        </div>
      </div>
      <div className="div-primary-cta-in">
        {/* <div className="heading-free-wrapper">        </div> */}
        <div className="text-wrapper">
          Register&nbsp;&nbsp; |&nbsp;&nbsp; Login
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
