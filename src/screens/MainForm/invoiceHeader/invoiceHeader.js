import React from "react";
import "./invoiceHeader.css";
import ImageUploader from "../FileUpload.js";

function Header() {
  return (
    <>
      <div className="formHeader">
        <div className="item">
          <div className="logo">
            <img className="imgSVG" alt="logo" src="SVG.svg" />
            <ImageUploader />
            <p className="text-wrapper">Upload</p>
          </div>
        </div>
        <div className="item">
          <div className="upload">
            <div className="div">Upload Logo</div>
            <div className="textWrapper">
              <p className="text">
                240 x 240 pixels @ 72 DPI,
                <br />
                Maximum size of 1MB.
              </p>
            </div>
          </div>
        </div>
        <div className="item">
          <h1 className="h-1">INVOICE</h1>
        </div>
      </div>

      {/* Main Header End */}
      <div className="formHeader">
        <div className="invoiceInfo">
          <div className="infoItem">
            <label className="data-input">Invoice#</label>
            <input
              type="number"
              className="text-wrapper-3"
              placeholder="INV-"
            ></input>
          </div>
          <div className="infoItem">
            <label className="data-input">Invoice Date</label>
            <input
              type="date"
              className="text-wrapper-3"
              placeholder="INV-"
            ></input>
          </div>
          <div className="infoItem">
            <label className="data-input">Due Date</label>
            <input
              type="date"
              className="text-wrapper-3"
              placeholder="INV-"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
