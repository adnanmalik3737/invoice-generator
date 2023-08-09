import "./App.css";
import React, { useState } from "react";

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
      <MainForm />
    </div>
  );
}

export default App;
