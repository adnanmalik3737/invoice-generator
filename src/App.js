import "./App.css";
import { InvoiceGenerator } from "./screens/InvoiceGenerator/InvoiceGenerator";
import RegistrationForm from "./screens/RegistrationForm/RegistrationForm.js";
import React, { useState } from "react";
import SignaturePopup from "./screens/SignaturePopup";
import MainForm from "./screens/MainForm/MainForm.js";
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
      {/* <SignaturePopup /> */}

      {/* <div className="regPopup">
        <h1>Registration Form Popup</h1>
        <button onClick={openPopup}>Open Registration Form</button>

        {isPopupOpen && <RegistrationForm onClose={closePopup} />}
      </div> */}

      {/* <InvoiceGenerator /> */}
      <MainForm />
    </div>
  );
}

export default App;
