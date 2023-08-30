// LoginSignupPopup.js
import React, { useState } from "react";
import "./Account.css";

// const Accounts = ({ isOpen, onClose }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordMismatch, setPasswordMismatch] = useState(false);

//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setPasswordMismatch(true);
//     } else {
//       setPasswordMismatch(false);
//       // Handle the signup logic here
//     }
//   };

const Accounts = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

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
        setLoginResponse(loginData);
        console.log("Login Success!");
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

  return (
    <div className={`accountPopup ${isOpen ? "open" : ""}`}>
      <button className="close" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="63"
          height="64"
          viewBox="0 0 63 64"
          fill="none"
        >
          <g filter="url(#filter0_d_234_72498)">
            <rect
              x="14"
              y="13.77"
              width="35"
              height="35"
              rx="17.5"
              fill="white"
            />
            <rect
              x="26.3398"
              y="36.72"
              width="15"
              height="1.00001"
              transform="rotate(-45 26.3398 36.72)"
              fill="black"
            />
            <rect
              x="36.9502"
              y="37.4199"
              width="15"
              height="1.00001"
              transform="rotate(-135 36.9502 37.4199)"
              fill="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_234_72498"
              x="0"
              y="0.77002"
              width="63"
              height="63"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="dilate"
                in="SourceAlpha"
                result="effect1_dropShadow_234_72498"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="6" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_234_72498"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_234_72498"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </button>
      <div className="clearflex"></div>
      <h2 className="accountTitle">{isLogin ? "Login" : "Signup"}</h2>
      <div className="accountsubtitle">
        {isLogin ? "Login to your account" : "Fill out the form to get started"}
      </div>
      <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
        {!isLogin && (
          <div className="input-icons">
            <svg
              className="icons"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.5 20H5.5C5.0875 20 4.73438 19.8531 4.44063 19.5594C4.14687 19.2656 4 18.9125 4 18.5V17.65C4 17.0167 4.15833 16.475 4.475 16.025C4.79167 15.575 5.2 15.2333 5.7 15C6.81667 14.5 7.8875 14.125 8.9125 13.875C9.9375 13.625 10.9667 13.5 12 13.5C13.0333 13.5 14.0583 13.6292 15.075 13.8875C16.0917 14.1458 17.1577 14.5183 18.273 15.0048C18.7947 15.2403 19.213 15.5817 19.5278 16.029C19.8426 16.4763 20 17.0167 20 17.65V18.5C20 18.9125 19.8531 19.2656 19.5594 19.5594C19.2656 19.8531 18.9125 20 18.5 20ZM5.5 18.5H18.5V17.65C18.5 17.3833 18.4208 17.1292 18.2625 16.8875C18.1042 16.6458 17.9083 16.4667 17.675 16.35C16.6083 15.8333 15.6333 15.4792 14.75 15.2875C13.8667 15.0958 12.95 15 12 15C11.05 15 10.125 15.0958 9.225 15.2875C8.325 15.4792 7.35 15.8333 6.3 16.35C6.06667 16.4667 5.875 16.6458 5.725 16.8875C5.575 17.1292 5.5 17.3833 5.5 17.65V18.5Z"
                fill="#333333"
              />
              <path
                d="M9.3 10.9251C10 11.6251 10.9 11.9751 12 11.9751C13.1 11.9751 14 11.6251 14.7 10.9251C15.4 10.2251 15.75 9.3251 15.75 8.2251C15.75 7.1251 15.4 6.2251 14.7 5.5251C14 4.8251 13.1 4.4751 12 4.4751C10.9 4.4751 10 4.8251 9.3 5.5251C8.6 6.2251 8.25 7.1251 8.25 8.2251C8.25 9.3251 8.6 10.2251 9.3 10.9251Z"
                fill="#009BD6"
              />
            </svg>
            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input-icons">
          <svg
            className="icons"
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M19.9203 17.8793H2.07539C1.69727 17.8793 1.38789 17.5699 1.38789 17.1875V4.77383C1.38789 4.3957 1.69727 4.08203 2.07539 4.08203H19.916C20.2941 4.08203 20.6035 4.39141 20.6035 4.77383V17.1832C20.6035 17.5699 20.2941 17.8793 19.9203 17.8793ZM20.6035 2.70703H1.3793C0.627344 2.70703 0.0214844 3.32148 0.0214844 4.06914V17.8879C0.0214844 18.6441 0.631641 19.25 1.3793 19.25H20.6207C21.3727 19.25 21.9785 18.6355 21.9785 17.8879V4.07344C21.9785 3.31719 21.3684 2.71133 20.6207 2.71133H20.6035V2.70703Z"
              fill="#333333"
            />
            <path
              d="M10.9957 11.9368C10.6777 11.9368 10.3684 11.8423 10.1105 11.6661L2.86172 6.83213C2.64258 6.69033 2.51367 6.44971 2.51367 6.179V6.16611C2.51367 5.73643 2.86602 5.37979 3.3 5.37979C3.45039 5.37979 3.60078 5.42705 3.72969 5.50869L10.3555 9.92588C10.5445 10.0548 10.768 10.1235 11.0043 10.1235C11.2363 10.1235 11.4555 10.0548 11.6531 9.93018L18.2746 5.50869C18.4035 5.42275 18.5539 5.37549 18.7043 5.37549C19.1383 5.37549 19.4906 5.72783 19.4906 6.16182V6.17471C19.4906 6.43682 19.3574 6.69033 19.1383 6.83213L11.8852 11.6704C11.623 11.8423 11.318 11.9368 10.9957 11.9368Z"
              fill="#009BD6"
            />
          </svg>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-icons">
          <svg
            className="icons"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.5 22C5.0875 22 4.73438 21.8531 4.44063 21.5594C4.14687 21.2656 4 20.9125 4 20.5V9.65C4 9.2375 4.14687 8.88438 4.44063 8.59063C4.73438 8.29688 5.0875 8.15 5.5 8.15H7.25V5.75C7.25 4.43583 7.71338 3.31563 8.64015 2.38938C9.56692 1.46313 10.6878 1 12.0027 1C13.3176 1 14.4375 1.46313 15.3625 2.38938C16.2875 3.31563 16.75 4.43583 16.75 5.75V8.15H18.5C18.9125 8.15 19.2656 8.29688 19.5594 8.59063C19.8531 8.88438 20 9.2375 20 9.65V20.5C20 20.9125 19.8531 21.2656 19.5594 21.5594C19.2656 21.8531 18.9125 22 18.5 22H5.5ZM5.5 20.5H18.5V9.65H5.5V20.5ZM8.75 8.15H15.25V5.75C15.25 4.84722 14.9343 4.07986 14.3029 3.44792C13.6716 2.81597 12.9049 2.5 12.003 2.5C11.101 2.5 10.3333 2.81597 9.7 3.44792C9.06667 4.07986 8.75 4.84722 8.75 5.75V8.15Z"
              fill="#333333"
            />
            <path
              d="M13.3627 16.4491C12.9877 16.8163 12.5349 16.9999 12.0044 16.9999C11.4739 16.9999 11.0197 16.8166 10.6419 16.4499C10.2641 16.0832 10.0752 15.6457 10.0752 15.1374C10.0752 14.6291 10.2627 14.1707 10.6377 13.7624C11.0127 13.3541 11.4655 13.1499 11.996 13.1499C12.5265 13.1499 12.9807 13.3541 13.3585 13.7624C13.7363 14.1707 13.9252 14.6249 13.9252 15.1249C13.9252 15.6405 13.7377 16.0819 13.3627 16.4491Z"
              fill="#009BD6"
            />
          </svg>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isLogin && (
          <>
            <div className="input-icons">
              <svg
                className="icons"
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <g clip-path="url(#clip0_234_72507)">
                  <path
                    d="M8.99879 16.3932C7.99969 15.0592 7.61735 13.5756 7.85178 11.9424C8.08621 10.3092 8.87042 8.9931 10.2044 7.994C11.5384 6.99489 13.022 6.61255 14.6552 6.84698C16.2884 7.08141 17.6045 7.86563 18.6036 9.19963C19.323 10.1601 19.7256 11.1704 19.8116 12.2304C19.8975 13.2905 19.6352 14.372 19.0244 15.4749L24.3596 22.5985L23.792 26.5531L18.2277 25.5044L18.1895 22.7844L15.59 21.9826L15.6667 19.5827L14.9023 18.5622C13.8522 18.8281 12.803 18.7966 11.7549 18.4675C10.7068 18.1385 9.78809 17.4471 8.99879 16.3932ZM10.1994 15.494C10.7789 16.2677 11.5702 16.7891 12.5733 17.0581C13.5765 17.3271 14.5482 17.2552 15.4885 16.8425L17.197 19.1237L17.1058 20.8786L19.6852 21.6954L19.6735 24.2653L22.5282 24.7823L22.7844 22.9974L17.2094 15.5537C17.8365 14.8341 18.1804 13.9518 18.2411 12.9069C18.3018 11.8619 18.0225 10.9259 17.403 10.0988C16.6537 9.09832 15.6666 8.51016 14.4417 8.33434C13.2168 8.15852 12.1041 8.44527 11.1036 9.1946C10.1031 9.94393 9.51496 10.931 9.33913 12.1559C9.16331 13.3808 9.45007 14.4935 10.1994 15.494Z"
                    fill="#333333"
                  />
                  <path
                    d="M12.1211 12.5554C12.0542 13.022 12.1605 13.4421 12.4403 13.8156C12.72 14.1891 13.0932 14.4094 13.5599 14.4764C14.0265 14.5433 14.4466 14.437 14.8201 14.1572C15.1936 13.8775 15.4138 13.5043 15.4808 13.0376C15.5478 12.571 15.4414 12.151 15.1617 11.7774C14.8819 11.4039 14.5087 11.1837 14.0421 11.1167C13.5755 11.0497 13.1554 11.1561 12.7819 11.4358C12.4084 11.7156 12.1881 12.0888 12.1211 12.5554Z"
                    fill="#009BD6"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_234_72507">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(19.21) rotate(53.1685)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordMismatch && (
              <p style={{ color: "red" }}>Passwords do not match!</p>
            )}
          </>
        )}
        {isLogin ? (
          <button className="LogSignBtn" type="submit">
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
      <p className="dividerText" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <span style={{ color: "#007bff", textDecoration: "underline" }}>
              Signup
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span style={{ color: "#007bff", textDecoration: "underline" }}>
              Login
            </span>
          </>
        )}
      </p>
      <p className="dividerText">or</p>
      <div class="divider"></div>

      <div className="socialLogins">
        <div className="socials">
          <div className="google">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M22.5015 12.2331C22.5015 11.3698 22.43 10.7398 22.2753 10.0864H12.2158V13.983H18.1205C18.0015 14.9514 17.3587 16.4097 15.9301 17.3897L15.91 17.5202L19.0907 19.9349L19.311 19.9564C21.3348 18.1247 22.5015 15.4297 22.5015 12.2331Z"
                fill="#4285F4"
              />
              <path
                d="M12.215 22.5001C15.1078 22.5001 17.5363 21.5667 19.3102 19.9567L15.9292 17.39C15.0245 18.0083 13.8102 18.44 12.215 18.44C9.38167 18.44 6.97693 16.6083 6.11971 14.0767L5.99406 14.0871L2.68681 16.5955L2.64355 16.7133C4.40543 20.1433 8.02448 22.5001 12.215 22.5001Z"
                fill="#34A853"
              />
              <path
                d="M6.11997 14.0765C5.89379 13.4232 5.76289 12.7231 5.76289 11.9998C5.76289 11.2764 5.89379 10.5765 6.10807 9.92313L6.10208 9.78398L2.75337 7.23535L2.64381 7.28642C1.91765 8.70977 1.50098 10.3081 1.50098 11.9998C1.50098 13.6915 1.91765 15.2897 2.64381 16.7131L6.11997 14.0765Z"
                fill="#FBBC05"
              />
              <path
                d="M12.215 5.55997C14.2269 5.55997 15.584 6.41163 16.3579 7.12335L19.3817 4.23C17.5246 2.53834 15.1078 1.5 12.215 1.5C8.02451 1.5 4.40544 3.85665 2.64355 7.28662L6.10783 9.92332C6.97696 7.39166 9.38171 5.55997 12.215 5.55997Z"
                fill="#EB4335"
              />
            </svg>
          </div>
        </div>
        <div className="socials">
          <div className="facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10.5"
                fill="url(#paint0_linear_234_72480)"
              />
              <path
                d="M15.9103 15.2112L16.3767 12.2476H13.4589V10.3252C13.4589 9.51428 13.8657 8.7233 15.1726 8.7233H16.5V6.20024C16.5 6.20024 15.2959 6 14.1452 6C11.7411 6 10.1712 7.4197 10.1712 9.98883V12.2476H7.5V15.2112H10.1712V22.3759C10.7075 22.458 11.2562 22.5 11.8151 22.5C12.374 22.5 12.9226 22.458 13.4589 22.3759V15.2112H15.9103Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_234_72480"
                  x1="12"
                  y1="1.5"
                  x2="12"
                  y2="22.4377"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#18ACFE" />
                  <stop offset="0.9999" stop-color="#0164E0" />
                  <stop offset="1" stop-color="#0163E0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="socials">
          <div className="instagram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="1.5"
                y="1.5"
                width="21"
                height="21"
                rx="6"
                fill="url(#paint0_radial_234_72483)"
              />
              <rect
                x="1.5"
                y="1.5"
                width="21"
                height="21"
                rx="6"
                fill="url(#paint1_radial_234_72483)"
              />
              <rect
                x="1.5"
                y="1.5"
                width="21"
                height="21"
                rx="6"
                fill="url(#paint2_radial_234_72483)"
              />
              <path
                d="M17.25 7.875C17.25 8.49632 16.7463 9 16.125 9C15.5037 9 15 8.49632 15 7.875C15 7.25368 15.5037 6.75 16.125 6.75C16.7463 6.75 17.25 7.25368 17.25 7.875Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75ZM12 14.25C13.2426 14.25 14.25 13.2426 14.25 12C14.25 10.7574 13.2426 9.75 12 9.75C10.7574 9.75 9.75 10.7574 9.75 12C9.75 13.2426 10.7574 14.25 12 14.25Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 11.7C4.5 9.17976 4.5 7.91965 4.99047 6.95704C5.4219 6.11031 6.11031 5.4219 6.95704 4.99047C7.91965 4.5 9.17976 4.5 11.7 4.5H12.3C14.8202 4.5 16.0804 4.5 17.043 4.99047C17.8897 5.4219 18.5781 6.11031 19.0095 6.95704C19.5 7.91965 19.5 9.17976 19.5 11.7V12.3C19.5 14.8202 19.5 16.0804 19.0095 17.043C18.5781 17.8897 17.8897 18.5781 17.043 19.0095C16.0804 19.5 14.8202 19.5 12.3 19.5H11.7C9.17976 19.5 7.91965 19.5 6.95704 19.0095C6.11031 18.5781 5.4219 17.8897 4.99047 17.043C4.5 16.0804 4.5 14.8202 4.5 12.3V11.7ZM11.7 6H12.3C13.5849 6 14.4583 6.00117 15.1334 6.05633C15.7911 6.11006 16.1274 6.20745 16.362 6.32698C16.9265 6.6146 17.3854 7.07354 17.673 7.63803C17.7926 7.87263 17.8899 8.20893 17.9437 8.86656C17.9988 9.54169 18 10.4151 18 11.7V12.3C18 13.5849 17.9988 14.4583 17.9437 15.1334C17.8899 15.7911 17.7926 16.1274 17.673 16.362C17.3854 16.9265 16.9265 17.3854 16.362 17.673C16.1274 17.7926 15.7911 17.8899 15.1334 17.9437C14.4583 17.9988 13.5849 18 12.3 18H11.7C10.4151 18 9.54169 17.9988 8.86656 17.9437C8.20893 17.8899 7.87263 17.7926 7.63803 17.673C7.07354 17.3854 6.6146 16.9265 6.32698 16.362C6.20745 16.1274 6.11006 15.7911 6.05633 15.1334C6.00117 14.4583 6 13.5849 6 12.3V11.7C6 10.4151 6.00117 9.54169 6.05633 8.86656C6.11006 8.20893 6.20745 7.87263 6.32698 7.63803C6.6146 7.07354 7.07354 6.6146 7.63803 6.32698C7.87263 6.20745 8.20893 6.11006 8.86656 6.05633C9.54169 6.00117 10.4151 6 11.7 6Z"
                fill="white"
              />
              <defs>
                <radialGradient
                  id="paint0_radial_234_72483"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(9 17.25) rotate(-55.3758) scale(19.1397)"
                >
                  <stop stop-color="#B13589" />
                  <stop offset="0.79309" stop-color="#C62F94" />
                  <stop offset="1" stop-color="#8A3AC8" />
                </radialGradient>
                <radialGradient
                  id="paint1_radial_234_72483"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(8.25 23.25) rotate(-65.1363) scale(16.9457)"
                >
                  <stop stop-color="#E0E8B7" />
                  <stop offset="0.444662" stop-color="#FB8A2E" />
                  <stop offset="0.71474" stop-color="#E2425C" />
                  <stop offset="1" stop-color="#E2425C" stop-opacity="0" />
                </radialGradient>
                <radialGradient
                  id="paint2_radial_234_72483"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(0.375001 2.25) rotate(-8.1301) scale(29.1682 6.23877)"
                >
                  <stop offset="0.156701" stop-color="#406ADC" />
                  <stop offset="0.467799" stop-color="#6A45BE" />
                  <stop offset="1" stop-color="#6A45BE" stop-opacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
