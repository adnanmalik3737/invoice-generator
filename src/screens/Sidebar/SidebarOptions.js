import React from "react";
import "./SidebarOptions.css";
import InvoiceModel from "../InvoiceModel/InvoiceModel.js";

// const invoiceInstance = InvoiceModel(); // Create an instance

// const handleDownloadClick = () => {
//   invoiceInstance.SaveAsPDFHandler(); // Call the extracted function
// };
// const reviewInvoiceHandler = (event) => {
//   event.preventDefault();
//   setIsOpen(true);
// };

// const addNextInvoiceHandler = () => {
//   setInvoiceNumber((prevNumber) => incrementString(prevNumber));
//   setItems([
//     {
//       id: uid(6),
//       name: "",
//       qty: 1,
//       price: "1.00",
//     },
//   ]);
// };

const predefinedColors = [
  "#ffffff",
  "#333333",
  "#555555",
  "#455A64",
  "#C62828",
  "#D81B60",
  "#7B1FA2",
  "#4527A0",
  "#283593",
  "#1565C0",
  "#0277BD",
  "#00695C",
  "#2E7D32",
  "#558B2F",
];

function SidebarOptions(props) {
  return (
    <div className="sidebarOption">
      <button className="sidebar-btn">
        {/* onClick={handleDownloadClick} */}
        <span>0</span>
        <span className="text">PDF Download</span>
      </button>
      <button className="sidebar-btn">
        <span>0</span>
        <span className="text">E-mail Invoice</span>
      </button>
      <button className="sidebar-btn">
        <span>0</span>
        <span className="text">Print Invoice</span>
      </button>
      {/* <button className="sidebar-btn">
        <span>
          0
        </span>
        <span>Delete Invoice</span>
      </button> */}
      <div className="color-picker-container">
        {predefinedColors.map((color, index) => (
          <div
            key={color}
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={() => props.setSelectedColor(color)}
          >
            {index === 0 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.5592 7.47686C14.5592 11.4533 11.3356 14.6769 7.35918 14.6769C3.38273 14.6769 0.15918 11.4533 0.15918 7.47686C0.15918 3.50041 3.38273 0.276855 7.35918 0.276855C11.3356 0.276855 14.5592 3.50041 14.5592 7.47686ZM10.4881 11.8785C9.60539 12.5072 8.52545 12.8769 7.35918 12.8769C4.37684 12.8769 1.95918 10.4592 1.95918 7.47686C1.95918 6.31058 2.32891 5.23066 2.95755 4.34791L10.4881 11.8785ZM11.7609 10.6057L4.23036 3.07514C5.11309 2.44655 6.19296 2.07686 7.35918 2.07686C10.3415 2.07686 12.7592 4.49452 12.7592 7.47686C12.7592 8.64308 12.3895 9.72297 11.7609 10.6057Z"
                  fill="#333333"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      {/* <div
        className="selected-color"
        style={{ backgroundColor: props.selectedColor }}
      >
        Selected Color
      </div>
      <button
        className="sidebar-btn dotted"
        onClick={() => {
          
        }}
      >
        <span>0</span>
        <span>New Item Field</span>
      </button> */}
    </div>
  );
}

export default SidebarOptions;
