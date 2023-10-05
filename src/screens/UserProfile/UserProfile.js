import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import userA from "../../img/userA.svg";
import axios from "axios";

function UserProfile() {
  const [fetechedData, setfetechedData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const [isSecurityEditMode, setIsSecurityEditMode] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const [updateResponse, setUpdateResponse] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/get`, {});

        if (response.data.code === 200) {
          console.log(response.data.data);
          setfetechedData(response.data);
          // console.log("Fetched user data:", fetechedData);
        } else {
          console.error("Failed to fetch user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditToggle = () => {
    setIsEditMode(!isEditMode);
    // Pre-fill the form with the current data
    setEditedName(fetechedData.data.name);
    setEditedEmail(fetechedData.data.email);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${baseUrl}/api/user/update`, {
        name: editedName,
        email: editedEmail,
      });

      if (response.data.code === 200) {
        setfetechedData(response.data); // Update the user data with the updated values
        setUpdateResponse(true);
        console.log(updateResponse);
        setIsEditMode(false); // Toggle back to display mode
      } else {
        console.error("Update failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleSecurityEditToggle = () => {
    setIsSecurityEditMode(!isSecurityEditMode);
    setPasswordChangeSuccess(false); // Reset the success message
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      console.error("New Password and Confirm New Password do not match");
      setPasswordMismatch("New Password and Confirm New Password do not match");
      setTimeout(() => {
        setPasswordMismatch(false);
      }, 4000);
      return;
    }
    try {
      const response = await axios.put(`${baseUrl}/api/user/changepassword`, {
        currentPassword,
        newPassword,
      });

      if (response.data.code === 200) {
        setPasswordChangeSuccess(true);
        setTimeout(() => {
          setPasswordChangeSuccess(false);
        }, 3000);
        console.log("Password changed!!");
        setIsSecurityEditMode(false); // Toggle back to display mode
      } else {
        console.error("Password change failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="profilePage">
      {fetechedData ? (
        <>
          <h2>Profile</h2>
          <div className="userProfile">
            {isEditMode ? (
              <form onSubmit={handleUpdateSubmit}>
                <div className="formFields">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Name"
                  />
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="formBtns">
                  <button
                    className="secondaryBtn"
                    type="button"
                    onClick={handleEditToggle}
                  >
                    Cancel
                  </button>
                  <button className="primryBtn" type="submit">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="profileHeader">
                {fetechedData && fetechedData.data ? (
                  <>
                    <div className="profile-picture">
                      <div style={{ textTransform: "capitalize" }}>
                        {fetechedData.data.name.charAt(0)}
                      </div>
                      <div className="profileInfo">
                        <div className="infoH">{fetechedData.data.name}</div>
                        <div className="infoP">{fetechedData.data.email}</div>
                      </div>
                    </div>

                    <div className="editButtons">
                      <button className="primryBtn" onClick={handleEditToggle}>
                        Edit
                      </button>
                    </div>
                  </>
                ) : (
                  <>Loading...</>
                )}
              </div>
            )}
          </div>
          <h2>Security</h2>
          {passwordChangeSuccess && (
            <div className="infoP" style={{ color: "#1e720a" }}>
              Password changed successfully!
            </div>
          )}
          {passwordMismatch && (
            <div className="infoP" style={{ color: "red" }}>
              {passwordMismatch}
            </div>
          )}
          <div className="userSecurity">
            {isSecurityEditMode ? (
              <>
                <form onSubmit={handlePasswordChangeSubmit}>
                  <div className="formFields">
                    <div className="profileInfo">
                      <div className="infoH">{"Password"}</div>
                      <div className="infoP">{"Change your Password"}</div>
                    </div>
                    <label>Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current Password"
                    />
                    <label>New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                    />
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm New Password"
                    />
                  </div>
                  <div className="formBtns">
                    <button
                      className="secondaryBtn"
                      type="button"
                      onClick={handleSecurityEditToggle}
                    >
                      Cancel
                    </button>
                    <button className="primryBtn" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="profileInfo">
                  <div className="infoH">{"Password"}</div>
                  <div className="infoP">{"Change your Password"}</div>
                </div>
                <div className="editButtons">
                  <button
                    className="primryBtn"
                    onClick={handleSecurityEditToggle}
                  >
                    Update Password
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        "Login Please"
      )}
    </div>
  );
}

export default UserProfile;
