// const UserProfile = ({ user }) => {
//   return (
//     <div className="userProfile">
//       <h1>Hiiiiiiiiiiiiiiiii</h1>
//       {/* <h2>{user.name}</h2>
//       <p>Email: {user.email}</p> */}
//       {/* <img src={user.avatar} alt="User Avatar" className="user-avatar" />

//       <p>Joined: {user.joinDate}</p> */}
//       {/* Add other user details as needed */}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile({ user, fetchUserData }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  return (
    <div className="userProfile">
      {/* Display user data from the fetched response */}
      <div className="profileHeader">
        <div className="profileWelcome">
          <p className="mainText">Welcome Abroad, {"Arslan"} 🤝</p>
          <p className="beowText">
            Enter your organization details to get started.
          </p>
        </div>
      </div>
      {/* {userData && ( */}
      <>
        <div className="profile-picture">
          {/* <img src={user.profileImage} alt="User Profile" /> */}
        </div>
        <div className="profile-details">
          <div className="full-name">
            <label>Full Name:</label>
            {/* <span>{user.name}</span> */}
          </div>
          <div className="username">
            <label>Username:</label>
            {/* <span>{user.username}</span> */}
          </div>
          <div className="email">
            <label>Email:</label>
            {/* <span>{user.email}</span> */}
          </div>
          <div className="date-of-birth">
            <label>Date of Birth:</label>
            {/* <span>{user.dob}</span> */}
          </div>
          <div className="address">
            <label>Address:</label>
            {/* <span>{user.address}</span> */}
          </div>
          {/* ... Add other fields as per the image ... */}
        </div>
      </>
      {/* )} */}
    </div>
  );
}

export default UserProfile;
