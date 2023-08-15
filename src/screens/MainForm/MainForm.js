import React from "react";
// import "./MainForm.css";
import Header from "./invoiceHeader/invoiceHeader.js";
import FileUpload from "./FileUpload";
import Body from "./InvoiceBody/InvoiceBody.js";

function MainForm() {
  return (
    <div className="mainForm">
      <Header />
      <Body />

      {/* <div className="div-d-flex">
        <div className="label">
          <img className="SVG" alt="Svg" src="SVG.svg" />
          <div className="text-wrapper">Upload</div>
        </div>
        <div className="group">
          <div className="div">Upload Logo</div>
          <div className="element-x-pixels-wrapper">
            <p className="element-x-pixels">
              240 x 240 pixels @ 72 DPI,
              <br />
              Maximum size of 1MB.
            </p>
          </div>
        </div>
        <h1 className="h-1">INVOICE</h1>
      </div>
      <div className="item-table-body">
        <div className="row">
          <div className="data-input">
            <div className="div-wrapper">
              <div className="text-wrapper-2">Invoice#</div>
            </div>
          </div>
          <div className="div-placeholder-wrapper">
            <div className="div-placeholder">
              <div className="text-wrapper-3">INV-12</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="data-input">
            <div className="div-2">
              <div className="text-wrapper-2">Invoice Date</div>
            </div>
          </div>
          <div className="data-input-2">
            <img
              className="calendar-svg"
              alt="Calendar svg"
              src="calendar-svg.svg"
            />
            <div className="div-placeholder-2">
              <div className="text-wrapper-4">Jul 24, 2023</div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="data-input">
            <div className="div-3">
              <div className="text-wrapper-2">Due Date</div>
            </div>
          </div>
          <div className="data-input-2">
            <img className="calendar-svg" alt="Calendar svg" src="image.svg" />
            <div className="div-placeholder-2">
              <div className="text-wrapper-4">Jul 24, 2023</div>
            </div>
          </div>
        </div>
      </div>  */}

      {/*  */}
      {/* From and To Code */}
      {/* <div className="text-wrapper-5">From</div>
      <div className="text-wrapper-6">Name</div>
      <div className="input">
        <div className="inputLabel">Business Name</div>
      </div>
      <div className="text-wrapper-8">Email</div>
      <div className="input-2">
        <div className="inputLabel">name@business.com</div>
      </div>
      <div className="text-wrapper-9">Company</div>
      <div className="input-3">
        <div className="inputLabel">Comapny Name</div>
      </div>
      <div className="text-wrapper-10">Phone</div>
      <div className="input-4">
        <div className="inputLabel">(123) 456 789</div>
      </div>
      <div className="text-wrapper-11">Address</div>
      <textarea className="inputField" placeholder="Street" />
      <div className="text-wrapper-12">Country</div>
      <div className="text-wrapper-13">City</div>
      <div className="text-wrapper-14">Postal Code</div>
      <div className="text-wrapper-15">Tax Reg.</div>
      <div className="text-wrapper-16">Website</div>

      <div className="input-6">
        <div className="inputLabel">Select Country</div>
        <img className="polygon" alt="Polygon" src="polygon-1.svg" />
      </div>
      <div className="input-7">
        <div className="inputLabel">Select City</div>
        <img className="img" alt="Polygon" src="polygon-1-2.svg" />
      </div>
      <div className="input-8">
        <div className="inputLabel">000000</div>
      </div>
      <div className="input-9">
        <div className="inputLabel">Tax Registration</div>
      </div>
      <div className="input-10">
        <div className="inputLabel">www.domian.com</div>
      </div>
      <div className="text-wrapper-17">Bill To</div>
      <div className="text-wrapper-18">Name</div>
      <div className="input-11">
        <div className="div-placeholder-3">
          <div className="text-wrapper-19">Client Name</div>
        </div>
      </div>
      <div className="text-wrapper-20">Company</div>
      <div className="input-12">
        <div className="div-placeholder-4">
          <div className="text-wrapper-21">Company Name</div>
        </div>
      </div>
      <div className="text-wrapper-22">Email</div>
      <div className="input-13">
        <div className="div-placeholder-5">
          <div className="text-wrapper-23">name@business.com</div>
        </div>
      </div>
      <div className="text-wrapper-24">Phone</div>
      <div className="input-14">
        <div className="div-placeholder-6">
          <div className="text-wrapper-25">(123) 456 789</div>
        </div>
      </div>
      <div className="text-wrapper-26">Address</div>
      <div className="input-15">
        <div className="div-placeholder-6">
          <div className="inputLabel">Street</div>
        </div>
      </div>
      <div className="text-wrapper-27">Country</div>
      <div className="text-wrapper-28">City</div>
      <div className="text-wrapper-29">Postal Code</div>
      <div className="text-wrapper-30">Website</div>
      <div className="input-16">
        <div className="div-placeholder-6">
          <div className="text-wrapper-31">Select Country</div>
        </div>
        <img className="img" alt="Polygon" src="polygon-1-3.svg" />
      </div>
      <div className="input-17">
        <div className="div-placeholder-6">
          <div className="inputLabel">Select City</div>
        </div>
        <img className="img" alt="Polygon" src="polygon-1-4.svg" />
      </div>
      <div className="input-18">
        <div className="div-placeholder-6">
          <div className="inputLabel">000000</div>
        </div>
      </div>
      <div className="input-19">
        <div className="div-placeholder-6">
          <div className="text-wrapper-32">www.domian.com</div>
        </div>
      </div> */}
      {/* <div className="separator" />
      <div className="separator-2" />
      <div className="separator-3" />
      <img
        className="row-data-button"
        alt="Row data button"
        src="row-data-button.svg"
      />
      <div className="invoice-summary">
        Invoice
        <br />
        summary
      </div>
      <div className="combobox-wrapper">
        <div className="combobox">
          <div className="overlap-group">
            <div className="div-choices-inner">
              <div className="text-wrapper-33">USD</div>
            </div>
            <img className="icon" alt="Icon" src="icon.svg" />
          </div>
        </div>
      </div>
      <div className="overlap">
        <div className="div-invoice-summary">
          <div className="text-wrapper-34">Subtotal</div>
        </div>
        <div className="text-wrapper-35">Tax</div>
      </div>
      <div className="text-wrapper-36">$0.00</div>
      <div className="text-wrapper-37">$0.00</div>
      <div className="text-wrapper-38">Balance Due</div>
      <div className="text-wrapper-39">Total</div>
      <div className="text-wrapper-40">$0.00</div>
      <div className="text-wrapper-41">$0.00</div>
      <p className="label-notes">Add Note ( Optional )</p>
      <div className="textarea" />
      <div className="text-wrapper-42">Signature</div>
      <img className="button" alt="Button" src="button.svg" />
      <div className="label-wrapper">
        <div className="label-2">
          <img className="SVG" alt="Svg" src="SVG-2.svg" />
          <div className="text-wrapper-43">Add Photo</div>
        </div>
      </div>
      <div className="group-2">
        <div className="div">Upload Stamp</div>
        <p className="p">
          240 x 240 pixels @ 72 DPI,
          <br />
          Maximum size of 1MB.
        </p>
      </div>
      <p className="link-show-additional">Add extra tax in total amount</p> */}
    </div>
  );
}

export default MainForm;
