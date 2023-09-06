import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./screens/Navbar/LeftNavbar";
import SignaturePopup from "./screens/MainForm/SignaturePopup";
import MainForm from "./screens/MainForm/MainForm.js";
import InvoiceHeader from "./screens/MainForm/invoiceHeader/invoiceHeader";
import ImageUploader from "./screens/MainForm/FileUpload";
import HeaderBar from "./screens/HeaderBar/Header.js";
import ResetPassword from "./screens/HeaderBar/ResetPassword.js";
import SidebarOptions from "./screens/Sidebar/SidebarOptions";
import UserProfile from "./screens/HeaderBar/UserProfile";
import History from "./screens/History/UserHistory";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isUserLoggedIn");
    console.log(isLoggedIn);
    if (isLoggedIn === "true") {
      setIsUserLoggedIn(true);
    }
  }, []);

  const [showUserProfile, setShowUserProfile] = useState(false);

  const openUserProfile = () => {
    setShowUserProfile(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div>
      <Router>
        <div className="wholeBody">
          <Sidebar isVisible={sidebarVisible} />
          <div className="headBody">
            <HeaderBar
              toggleSidebar={toggleSidebar}
              sidebarVisible={sidebarVisible}
              openUserProfile={openUserProfile}
            />
            {/* <div
              className="colorField"
              style={{
                backgroundColor: selectedColor,
                width: 730,
                height: 5,
                marginLeft: 60,
              }}
            >
            </div> */}
            <div className="navComponents">
              {showUserProfile && <UserProfile />}
              <Routes>
                <Route path="/home"></Route>
                <Route path="/create-invoice" element={<MainForm />}></Route>
                <Route path="/history" element={<History />}></Route>
                <Route
                  path="/pdf-templates"
                  element={<InvoiceHeader />}
                ></Route>
                <Route
                  path="/attach-with-websites"
                  component={<ImageUploader />}
                ></Route>
                <Route
                  path="/professional-business-use"
                  component={
                    <MainForm
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                    />
                  }
                ></Route>
                <Route
                  path="/resetpassword"
                  element={<ResetPassword />}
                ></Route>

                {showUserProfile && <></>}
                <Route path="/user-profile" element={<UserProfile />}></Route>
              </Routes>
              {/* <div className="sidebarOptions">
                <SidebarOptions
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                ></SidebarOptions>
              </div> */}
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
