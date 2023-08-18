import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./screens/Navbar/LeftNavbar";
import SignaturePopup from "./screens/MainForm/SignaturePopup";
import MainForm from "./screens/MainForm/MainForm.js";
import Header from "./screens/MainForm/invoiceHeader/invoiceHeader";
import ImageUploader from "./screens/MainForm/FileUpload";
import HeaderBar from "./screens/HeaderBar/Header.js";
function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <Router>
        <div className="wholeBody">
          <Sidebar />
          <div className="headBody">
            <HeaderBar />
            <div className="navComponents">
              <Routes>
                <Route path="/create-invoice" element={<MainForm />}></Route>
                <Route path="/history" element={<SignaturePopup />}></Route>
                <Route path="/pdf-templates" element={<Header />}></Route>
                <Route
                  path="/attach-with-websites"
                  component={<ImageUploader />}
                ></Route>
                <Route
                  path="/professional-business-use"
                  component={<MainForm />}
                ></Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
