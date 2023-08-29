import React from "react";
import "./HeaderStyle.css";

const HeaderBar = ({ toggleSidebar, sidebarVisible }) => {
  return (
    <div className="headerBar">
      <div className="logo_icon_bar">
        <div className="headerLogo">
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
        {!sidebarVisible && (
          <div className="headerLogo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="31"
              viewBox="0 0 52 31"
              stroke="2"
              fill="none"
            >
              <path
                d="M40.1778 30.8119C39.5011 30.8119 38.8156 30.6712 38.1565 30.3812L24.0954 24.1147C21.5819 22.9985 20.4483 20.0367 21.5644 17.5231L27.8304 3.46084C28.9465 0.947216 31.9081 -0.18655 34.4215 0.929639L48.4826 7.19612C50.996 8.3123 52.1298 11.2742 51.0137 13.7878L44.7477 27.85C43.9128 29.7132 42.0848 30.8119 40.1778 30.8119ZM39.3253 27.7445C40.3887 28.2191 41.6366 27.7357 42.1112 26.6811L48.3773 12.6189C48.8518 11.5554 48.3684 10.3074 47.3138 9.83278L33.2439 3.5663C32.1805 3.0917 30.9326 3.57509 30.458 4.62976L24.192 18.692C23.7175 19.7554 24.2008 21.0035 25.2554 21.4781L39.3253 27.7445Z"
                fill="#8DC540"
              />
              <path
                d="M26.6256 13.2518L24.5516 17.8923C24.5253 17.945 24.4989 17.989 24.4725 18.0329L25.281 23.025C25.4656 24.1763 24.6835 25.2574 23.541 25.4419L8.3374 27.9028C7.78375 27.9907 7.2213 27.8589 6.76431 27.5337C6.30733 27.2085 6.00853 26.7163 5.92065 26.1626L3.45995 10.9579C3.37207 10.4042 3.50389 9.84167 3.82906 9.38465C4.15422 8.92763 4.64636 8.6288 5.20002 8.54092L20.4036 6.08003C20.5178 6.06245 20.6321 6.05366 20.7376 6.05366C21.7482 6.05366 22.6534 6.79193 22.8204 7.82902L23.6377 12.8563L25.782 8.04874L25.6677 7.37199C25.2283 4.65623 22.6622 2.80177 19.9466 3.24122L4.74303 5.7021C3.43359 5.90425 2.27354 6.61615 1.50018 7.69718C0.718033 8.77821 0.410446 10.0965 0.621363 11.4149L3.08206 26.6197C3.29298 27.938 4.00482 29.0893 5.08577 29.8715C5.93822 30.4956 6.94887 30.812 7.99466 30.812C8.25831 30.812 8.53074 30.7944 8.80318 30.7504L24.0068 28.2895C26.7223 27.8501 28.5766 25.2837 28.1372 22.568L26.6256 13.2518Z"
                fill="#C62828"
              />
            </svg>
          </div>
        )}
        <div className="title-divider" />
        <div className="div-title">
          <div className="heading-free">Free Invoice Generator</div>
          <div className="link-by-zoho-invoice">by Leed</div>
        </div>
      </div>
      <div className="accountsIconText">
        {/* <div className="heading-free-wrapper">        </div> */}
        <div className="text-wrapper">Register</div>
        <div className="title-divider" />
        <div className="text-wrapper">Login</div>
      </div>
    </div>
  );
};

export default HeaderBar;
