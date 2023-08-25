import React from "react";
import "./InvoiceBody.css";

function InvoiceFrom() {
  return (
    <>
      <div className="fromBody">
        <div className="From">From</div>
        <div className="invoice-body">
          <label className="">Name</label>
          <input className="" placeholder="Business Name" />
        </div>

        <div className="invoice-body">
          <label className="">Email</label>
          <input type="email" className="" placeholder="name@business.com" />
        </div>

        <div className="invoice-body">
          <label className="">Company </label>
          <input className="" placeholder="Comapny Name" />
        </div>

        <div className="invoice-body">
          <label className="">Phone</label>
          <input className="" placeholder="(123) 456 789" />
        </div>

        <div className="invoice-body">
          <label className="">Address</label>
          <textarea className="" placeholder="Street" />
        </div>

        <div className="invoice-body">
          <label className="">Country</label>
          <input className="" placeholder="Select Country" />
        </div>

        <div className="invoice-body">
          <label className="">City</label>
          <input className="" placeholder="Select City" />
        </div>
      </div>
    </>
  );
}

export default InvoiceFrom;
