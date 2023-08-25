import React from "react";
import InvoiceFrom from "./InvoiceFrom";
import SenderReceiver from "./SenderReceiver";
import InvoiceForm from "./InvoiceForm.js";

function Body() {
  return (
    <>
      <div className="mainBody">
        <div className="mainBodyTo">
          <InvoiceFrom />
        </div>

        <div className="mainBodyTo">
          <SenderReceiver
            label="Invoice To"
            initialFields={[
              {
                id: "name",
                type: "text",
                labelText: "Name",
                placeholder: "Business Name",
                defaultValue: "",
              },
              {
                id: "email",
                type: "email",
                labelText: "Email",
                placeholder: "name@business.com",
                defaultValue: "",
              },
              {
                id: "company",
                type: "text",
                labelText: "Company",
                placeholder: "Company Name",
                defaultValue: "",
              },
              {
                id: "phone",
                type: "text",
                labelText: "Phone",
                placeholder: "(123) 456 789",
                defaultValue: "",
              },
              {
                id: "address",
                type: "textarea",
                labelText: "Address",
                placeholder: "Street",
                defaultValue: "",
              },
              {
                id: "city",
                type: "text",
                labelText: "City",
                placeholder: "Select City",
                defaultValue: "",
              },
              {
                id: "country",
                type: "text",
                labelText: "Country",
                placeholder: "Select Country",
                defaultValue: "",
              },
            ]}
          />
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
