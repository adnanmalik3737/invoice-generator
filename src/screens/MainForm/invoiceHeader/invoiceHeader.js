import React, { useState } from "react";
import "./invoiceHeader.css";
import ImageUploader from "../FileUpload.js";

function Header() {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleLogoChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  return (
    <>
      <div className="formHeader">
        <div className="itemHeader">
          <ImageUploader
            inputId="upload-logo-1"
            uploadUrl="YOUR_URL"
            onImageChange={(imageData) => {
              // Handle image data update for this specific usage
            }}
          />
        </div>

        <div className="itemHeader">
          <div className="upload">
            <div className="uploadLogo">Upload Logo</div>
            <div className="textWrapper">
              <p className="text">
                240 x 240 pixels @ 72 DPI,
                <br />
                Maximum size of 1MB.
              </p>
            </div>
          </div>
        </div>
        <div className="itemHeader">
          <h1 className="h-1">INVOICE</h1>
        </div>
      </div>

      {/* Main Header End */}
      <div className="formHeader">
        <div className="invoiceInfo">
          <div className="infoItem">
            <label className="inputItem">Invoice#</label>
            <input
              type="number"
              className="inputItem"
              placeholder="INV-"
            ></input>
          </div>
          <div className="infoItem">
            <label className="inputItem">Invoice Date</label>
            <input type="date" className="inputItem" placeholder="INV-"></input>
          </div>
          <div className="infoItem">
            <label className="inputItem">Due Date</label>
            <input type="date" className="inputItem" placeholder="INV-"></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
