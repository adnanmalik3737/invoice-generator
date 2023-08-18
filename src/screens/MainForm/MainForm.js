import React from "react";
import Header from "./invoiceHeader/invoiceHeader.js";
import Body from "./InvoiceBody/InvoiceBody.js";

function MainForm() {
  return (
    <div className="mainForm">
      <Header />
      <Body />
    </div>
  );
}

export default MainForm;
