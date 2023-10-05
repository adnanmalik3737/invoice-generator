import React, { useState, useRef } from "react";

function MyComponent() {
  const [selectedOption, setSelectedOption] = useState(""); // To track the selected radio button
  const fileInputRef = useRef(null); // Create a ref for the file input element

  // Function to handle radio button change and trigger file input click
  const handleRadioButtonChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Update the selected option state

    // if (selectedValue === "image") {
    //   // Trigger the click event on the file input element
    //   fileInputRef.current.click();
    // }
  };

  // Function to handle file input change
  const handleFileInputChange = (event) => {
    // Handle file selection here
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="options"
          value="signature"
          checked={selectedOption === "signature"}
          onChange={handleRadioButtonChange}
        />
        Create Signature
      </label>
      <label>
        <input
          type="radio"
          name="options"
          value="image"
          checked={selectedOption === "image"}
          onChange={handleRadioButtonChange}
        />
        Upload Image
      </label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default MyComponent;
