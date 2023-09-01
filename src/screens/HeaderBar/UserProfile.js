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
      {userData && (
        <div>
          <h1>Hiiiiiiiiiiiiiiiii</h1>
          {/* <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p> */}
          {/* Add other user data fields */}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
