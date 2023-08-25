import React, { useState } from "react";
import "./InvoiceBody.css";

function SenderReceiver({ className, label, initialFields }) {
  const [fields, setFields] = useState(initialFields);
  const [customLabel, setCustomLabel] = useState(""); // For user-defined label text

  const addField = () => {
    // if (!customLabel.trim()) {
    //   alert("Please enter a label for the custom field.");
    //   return;
    // }
    const newField = {
      id: `custom_${fields.length + 1}`,
      type: "text",
      labelText: customLabel || "Custom Field", // Use user-defined label or default to 'Custom Field'
      placeholder: "Enter value",
      defaultValue: "",
    };
    setFields((prevFields) => [...prevFields, newField]);
    setCustomLabel(""); // Reset the custom label input
  };

  const deleteField = (id) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  return (
    <div className={`fromBody ${className}`}>
      <div className="From">{label}</div>

      {fields.map((field) => (
        <div key={field.id} className="invoice-body">
          <label htmlFor={field.id}>{field.labelText}</label>
          {field.type !== "textarea" ? (
            <input
              id={field.id}
              type={field.type}
              className="input-field"
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
            />
          ) : (
            <textarea
              id={field.id}
              className="input-field"
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
            />
          )}
          {/* 
            // Delete Field Button
          <button
            style={{ background: "white", color: "black", padding: 5 }}
            onClick={() => deleteField(field.id)}
            className="deleteFieldBtn"
          >
            X
          </button> */}
        </div>
      ))}

      {/* 
          // Add Field Option

      <div className="addCustomFieldSection">
        <input
          className="inputItem"
          // required
          value={customLabel}
          onChange={(e) => setCustomLabel(e.target.value)}
          placeholder="Enter label"
        />
        <button onClick={addField} className="addFieldBtn">
          + Field
        </button>
      </div> */}
    </div>
  );
}

SenderReceiver.defaultProps = {
  className: "",
  label: "To",
  fields: [
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
      id: "country",
      type: "text",
      labelText: "Country",
      placeholder: "Select Country",
      defaultValue: "",
    },
    {
      id: "city",
      type: "text",
      labelText: "City",
      placeholder: "Select City",
      defaultValue: "",
    },
  ],
};

export default SenderReceiver;
