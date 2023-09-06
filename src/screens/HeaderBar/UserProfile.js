import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import userA from "../../img/userA.svg";

function UserProfile({ user, fetchUserData }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  return (
    <div className="profilePage">
      <h2>Profile</h2>
      <div className="userProfile">
        {/* Display user data from the fetched response */}
        <div className="profileHeader">
          <div className="profile-picture">
            <img src={userA} />
          </div>
          <div className="profileInfo">
            <p className="userName">"Arslan Fakhir" {"user.name"}</p>
            <p className="userEmail">{"marsalan@leeddev.io"}</p>
          </div>
          <div className="editButtons">
            <button>Edit</button>
          </div>
        </div>
      </div>
      <h2>Security</h2>
      <div className="userProfile">
        {/* Display user data from the fetched response */}
        <div className="profileHeader">
          <div className="profileInfo">
            <p className="userName">{"Password"}</p>
            <p className="userEmail">{"Change your Password"}</p>
          </div>
          <div className="editButtons">
            <button>Update password</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
