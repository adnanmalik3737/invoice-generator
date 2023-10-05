import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TopHeader.css";
import companyLogo from "../../img/companyLogo.svg";

const ResetPassword = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    console.log(tokenFromUrl);
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resetToken: token,
          newPassword: newPassword,
        }),
      });

      const responseData = await response.json();
      console.log(responseData.data);
      if (responseData.code === 200) {
        setMessage("Password successfully reset!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (responseData.code === 400) {
        setMessage("Invalid or expired token");
      } else {
        setMessage("Password not successfully reset!");
      }
    } catch (error) {
      setMessage("Network error occurred.");
    }
  };

  return (
    <div className="resetPassword">
      <div className="resetPass">
        <img src={companyLogo} width="50" height="30"></img>

        <h2>Create New Password</h2>
        <p>
          Enter a unique and strong password that is easy to remember so that
          you won't forget it the next time.
        </p>
        <form className="resetPassForm" onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
