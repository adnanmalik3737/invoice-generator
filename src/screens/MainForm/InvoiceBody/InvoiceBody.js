import React from "react";
import InvoiceFrom from "./InvoiceFrom";

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
    </>
  );
}

export default Body;
