import React, { useState } from "react";
import "./SidebarOptions.css";

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
  // const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);

  return (
    <div className="sidebarOption">
      <button className="sidebar-btn">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="#333"
          >
            <g clip-path="url(#clip0_234_96328)">
              <path
                d="M2.43945 0.566406V15.5078H13.5576V4.86719H9.4209V0.566406H2.43945ZM3.37988 1.50391H8.48047V5.80469H12.6201V14.5703H3.37988V1.50391Z"
                fill="#333333"
              />
              <path
                d="M10.4316 3.69238H13.5605L10.4316 0.566406V3.69238Z"
                fill="#333333"
              />
              <path
                d="M7.58984 7.34277H8.52734V12.6367H7.58984V7.34277Z"
                fill="#333333"
              />
              <path
                d="M8.03809 13.7529L5.39844 11.3975L6.02246 10.6973L8.04395 12.502L10.0947 10.6943L10.7158 11.3975L8.03809 13.7529Z"
                fill="#333333"
              />
            </g>
            <defs>
              <clipPath id="clip0_234_96328">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.5 0.537109)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>PDF Download</span>
      </button>
      <button className="sidebar-btn">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_234_96323)">
              <path
                d="M13.832 12.7275H1.66504C1.40723 12.7275 1.19629 12.5166 1.19629 12.2559V3.79199C1.19629 3.53418 1.40723 3.32031 1.66504 3.32031H13.8291C14.0869 3.32031 14.2979 3.53125 14.2979 3.79199V12.2529C14.2979 12.5166 14.0869 12.7275 13.832 12.7275ZM14.2979 2.38281H1.19043C0.677734 2.38281 0.264648 2.80176 0.264648 3.31152V12.7334C0.264648 13.249 0.680664 13.6621 1.19043 13.6621H14.3096C14.8223 13.6621 15.2354 13.2432 15.2354 12.7334V3.31445C15.2354 2.79883 14.8193 2.38574 14.3096 2.38574H14.2979V2.38281Z"
                fill="#333333"
              />
              <path
                d="M7.74707 8.67578C7.53027 8.67578 7.31934 8.61133 7.14355 8.49121L2.20117 5.19531C2.05176 5.09863 1.96387 4.93457 1.96387 4.75V4.74121C1.96387 4.44824 2.2041 4.20508 2.5 4.20508C2.60254 4.20508 2.70508 4.2373 2.79297 4.29297L7.31055 7.30469C7.43945 7.39258 7.5918 7.43945 7.75293 7.43945C7.91113 7.43945 8.06055 7.39258 8.19531 7.30762L12.71 4.29297C12.7979 4.23437 12.9004 4.20215 13.0029 4.20215C13.2988 4.20215 13.5391 4.44238 13.5391 4.73828V4.74707C13.5391 4.92578 13.4482 5.09863 13.2988 5.19531L8.35352 8.49414C8.1748 8.61133 7.9668 8.67578 7.74707 8.67578Z"
                fill="#333333"
              />
            </g>
            <defs>
              <clipPath id="clip0_234_96323">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.25 0.537109)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>E-mail Invoice</span>
      </button>
      <button className="sidebar-btn">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clip-path="url(#clip0_234_96308)">
              <path
                d="M12.5 4.28711V0.537109H3.125V4.28711H0.3125V11.7871H3.125V15.5371H12.5V11.7871H15.3125V4.28711H12.5ZM4.0625 1.47461H11.5625V4.28711H4.0625V1.47461ZM11.5625 14.5996H4.0625V9.91504H11.5625V14.5996ZM14.375 10.8496H12.5V8.97461H3.125V10.8496H1.25V5.22461H14.375V10.8496Z"
                fill="#333333"
              />
              <path
                d="M11.4746 6.11816H13.5664V6.81543H11.4746V6.11816ZM5.19629 10.6533H10.0801V11.3506H5.19629V10.6533ZM5.19629 12.7451H7.98828V13.4424H5.19629V12.7451Z"
                fill="#333333"
              />
            </g>
            <defs>
              <clipPath id="clip0_234_96308">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.3125 0.537109)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        <span>Print Invoice</span>
      </button>
      {/* <button className="sidebar-btn">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M2.47839 2.81201V2.76201H2.42839H1.62422V1.61201H5.49089H5.54089V1.56201V0.987012H10.9409V1.56201V1.61201H10.9909H14.8576V2.76201H14.0534H14.0034V2.81201V14.687C14.0034 15.0062 13.8843 15.2854 13.643 15.5267C13.4018 15.7679 13.1226 15.887 12.8034 15.887H3.67839C3.348 15.887 3.06642 15.77 2.83093 15.5345C2.59544 15.299 2.47839 15.0174 2.47839 14.687V2.81201ZM12.8534 2.81201V2.76201H12.8034H3.67839H3.62839V2.81201V14.687V14.737H3.67839H12.8034H12.8534V14.687V2.81201Z"
              fill="#333333"
              stroke="white"
              stroke-width="0.1"
            />
            <path
              d="M7.08672 12.8455H5.93672V4.63301H7.08672V12.8455ZM10.5451 12.8455H9.39505V4.63301H10.5451V12.8455Z"
              fill="#333333"
              stroke="white"
              stroke-width="0.1"
            />
          </svg>
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
      </div> */}
      <button
        className="sidebar-btn dotted"
        onClick={() => {
          /* Logic to add new item field */
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M5.77637 1.03711V6.03711M5.77637 6.03711V11.0371M5.77637 6.03711H10.7764M5.77637 6.03711H0.776367"
              stroke="#009BD6"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span>New Item Field</span>
      </button>
    </div>
  );
}

export default SidebarOptions;
