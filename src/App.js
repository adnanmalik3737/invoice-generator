import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./screens/Navbar/LeftNavbar";
import MainForm from "./screens/MainForm/MainForm.js";
import InvoiceHeader from "./screens/MainForm/invoiceHeader/invoiceHeader";
import ImageUploader from "./screens/MainForm/FileUpload";
import HeaderBar from "./screens/HeaderBar/Header.js";
import ResetPassword from "./screens/HeaderBar/ResetPassword.js";
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
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    setIsUserLoggedIn(isUserLoggedIn);
  }, []);

  const [showUserProfile, setShowUserProfile] = useState(false);

  const openUserProfile = () => {
    setShowUserProfile(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // const [sidebarVisible, setSidebarVisible] = useState(false);
  // const [sidebarVisible, setSidebarVisible] = useState(!isMobile);
  // const isMobile = window.innerWidth <= 768;
  const isMobile = window.innerWidth <= 768;
  const [sidebarVisible, setSidebarVisible] = useState(!isMobile);

  // const toggleSidebar = () => {
  //   setSidebarVisible((prevVisibility) => !prevVisibility);
  // };

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("show");
    }
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
              <Routes>
                <Route path="/home"></Route>
                <Route path="/" element={<MainForm />} />
                <Route path="/create-invoice" element={<MainForm />}></Route>
                {isUserLoggedIn && (
                  <Route path="/history" element={<History />}></Route>
                )}
                {isUserLoggedIn && (
                  <Route path="/user-profile" element={<UserProfile />}></Route>
                )}
                <Route
                  path="/edit-invoice/:invoiceId"
                  element={<MainForm />}
                ></Route>
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
