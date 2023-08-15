import React from "react";
import InvoiceFrom from "./InvoiceFrom";
import InvoiceForm from "./InvoiceForm.js";

function Body() {
  return (
    <>
      <div className="mainBody">
        <div className="mainBodyTo">
          <InvoiceFrom />
        </div>

        <div className="mainBodyTo">
          <InvoiceFrom />
        </div>
      </div>

      <hr className="hrLine" />
      <div className="invoiceForm">
        <InvoiceForm />
      </div>
    </>
  );
}

export default Body;
