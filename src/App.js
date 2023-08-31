import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./screens/Navbar/LeftNavbar";
import SignaturePopup from "./screens/MainForm/SignaturePopup";
import MainForm from "./screens/MainForm/MainForm.js";
import InvoiceHeader from "./screens/MainForm/invoiceHeader/invoiceHeader";
import ImageUploader from "./screens/MainForm/FileUpload";
import HeaderBar from "./screens/HeaderBar/Header.js";
import ResetPassword from "./screens/HeaderBar/ResetPassword.js";
import SidebarOptions from "./screens/Sidebar/SidebarOptions";
function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const openPopup = () => {
    setIsPopupOpen(true);
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
            />
            <div
              className="colorField"
              style={{
                backgroundColor: selectedColor,
                width: 730,
                height: 5,
                marginLeft: 60,
              }}
            >
              {/* Your content here */}
            </div>
            <div className="navComponents">
              <Routes>
                <Route path="/create-invoice" element={<MainForm />}></Route>
                <Route path="/history" element={<SignaturePopup />}></Route>
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
