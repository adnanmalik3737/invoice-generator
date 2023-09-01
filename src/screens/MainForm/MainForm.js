import React, { useState } from "react";
// import Body from "./InvoiceBody/InvoiceBody.js";
import "./invoiceHeader/invoiceHeader.css";
import ImageUploader from "./FileUpload.js";
import incrementString from "../helpers/incrementString";
import { uid } from "uid";
import SenderReceiver from "./InvoiceBody/SenderReceiver";
import "../Sidebar/SidebarOptions.css";
// import InvoiceForm from "./InvoiceBody/InvoiceForm.js";

import InvoiceItem from "./InvoiceBody/InvoiceItem";
import InvoiceModel from "../InvoiceModel/InvoiceModel.js";
import SignaturePopup from "./SignaturePopup";

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

function MainForm(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [selectedColor, setSelectedColor] = useState();
  // const date = new Date();
  // const today = date.toLocaleDateString("en-GB", {
  //   month: "numeric",
  //   day: "numeric",
  //   year: "numeric",
  // });

  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [invoiceFields, setInvoiceFields] = useState("");

  const handleFieldsChange = (updatedFields) => {
    setInvoiceFields(updatedFields);
  };

  //For Editable content
  const [isEditable, setIsEditable] = useState(false);
  const handleTextClick = () => {
    setIsEditable(true);
  };
  const handleBlur = () => {
    setIsEditable(false);
  };
  //End Editable content

  // const invoiceInstance = InvoiceModel(); // Create an instance

  // const handleDownloadClick = () => {
  //   invoiceInstance.SaveAsPDFHandler(); // Call the extracted function
  // };

  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "0.00",
    },
  ]);

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

    await fetch("logoFile", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "0.00",
      },
    ]);
  };

  // InvoiceForm constants
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [gst, setGst] = useState("");
  const [itax, setItax] = useState("");
  const [shipping, setShipping] = useState(0);
  const [notes, setNotes] = useState("");
  // const [cashierName, setCashierName] = useState('');
  // const [customerName, setCustomerName] = useState('');

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        qty: 1,
        price: "0.00",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };

  const [showField, setShowField] = useState(false);
  const [buttonText, setButtonText] = useState("+ Tax");

  const toggleField = () => {
    setShowField(!showField);
    setButtonText(showField ? "+ Tax" : "- Tax");
  };

  const [showFieldDiscount, setShowFieldDiscount] = useState(false);
  const [buttonText2, setButtonText2] = useState("+ Discount");

  const toggleField2 = () => {
    setShowFieldDiscount(!showFieldDiscount);
    setButtonText2(showFieldDiscount ? "+ Discount" : "- Discount");
  };

  const [showFieldShipping, setShowFieldShipping] = useState(false);
  const [buttonText3, setButtonText3] = useState("+ Shipping");

  const toggleField3 = () => {
    setShowFieldShipping(!showFieldShipping);
    setButtonText3(showFieldShipping ? "+ Shipping" : "- Shipping");
  };

  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const gstRate = (gst * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const shippingAmount = parseFloat(shipping);
  const total = subtotal - discountRate + taxRate + gstRate + shippingAmount;

  const [symbol, setSymbol] = useState("$"); // default to USD

  const handleCurrencyChange = (event) => {
    setSymbol(event.target.value);
  };

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="wholeFormBody">
      <div className="mainForm">
        <form className="" onSubmit={reviewInvoiceHandler}>
          {/* Preview Button */}
          <div className="invoiceTop">
            <button className="invoiceTopBtn" type="submit">
              <span>Preview</span>
            </button>
            <InvoiceModel
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              invoiceInfo={{
                invoiceNumber,
                invoiceDate,
                dueDate,
                subtotal,
                taxRate,
                discountRate,
                symbol,
                shipping,
                total,
                notes,
                selectedColor,
              }}
              items={items}
              onAddNextInvoice={addNextInvoiceHandler}
              uploadedImage={uploadedImage}
              invoiceFields={invoiceFields}
            />

            <button className="invoiceTopBtn" type="reset">
              <span>Reset</span>
            </button>
          </div>
          <div className="mainFormBody">
            <div
              className="colorField"
              style={{
                backgroundColor: selectedColor,
                height: 5,
              }}
            >
              {/* Color Line */}
            </div>
            {/* Header Start */}
            <div className="formHeader">
              <div className="itemHeader">
                <ImageUploader
                  inputId="logoFile"
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
              <div className="itemHeader h-1">
                <div
                  className={`editable-text ${isEditable ? "editing" : ""}`}
                  onClick={handleTextClick}
                  onBlur={handleBlur}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                >
                  INVOICE
                </div>
              </div>
            </div>

            {/* Main Header End */}
            <div className="formHeaderB">
              <div className="invoiceInfo">
                <div className="infoItem">
                  <label className="inputItem">Invoice#</label>
                  <input
                    required
                    className="inputItem"
                    type="number"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    min="1"
                    step="1"
                    value={invoiceNumber}
                    onChange={(event) => setInvoiceNumber(event.target.value)}
                  />
                </div>
                <div className="infoItem">
                  <label className="inputItem">Invoice Date</label>
                  <input
                    type="date"
                    className="inputItem"
                    value={invoiceDate}
                    onChange={(event) => setInvoiceDate(event.target.value)}
                  />
                </div>
                <div className="infoItem">
                  <label className="inputItem">Due Date</label>
                  <input
                    type="date"
                    className="inputItem"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Header End */}
            {/* <Body /> */}

            {/* Body Starts */}
            <div className="mainBody">
              <div className="mainBodyTo">
                <SenderReceiver
                  label="Invoice From"
                  initialFields={[
                    {
                      id: "sendername",
                      type: "text",
                      labelText: "Name",
                      placeholder: "Business Name",
                      defaultValue: "",
                    },
                    {
                      id: "senderemail",
                      type: "email",
                      labelText: "Email",
                      placeholder: "name@business.com",
                      defaultValue: "",
                    },
                    {
                      id: "sendercompany",
                      type: "text",
                      labelText: "Company",
                      placeholder: "Company Name",
                      defaultValue: "",
                    },
                    {
                      id: "senderphone",
                      type: "text",
                      labelText: "Phone",
                      placeholder: "(123) 456 789",
                      defaultValue: "",
                    },
                    {
                      id: "senderaddress",
                      type: "textarea",
                      labelText: "Address",
                      placeholder: "Street",
                      defaultValue: "",
                    },
                    {
                      id: "sendercity",
                      type: "text",
                      labelText: "City",
                      placeholder: "Select City",
                      defaultValue: "",
                    },
                    {
                      id: "sendercountry",
                      type: "text",
                      labelText: "Country",
                      placeholder: "Select Country",
                      defaultValue: "",
                    },
                  ]}
                  onFieldsChange={handleFieldsChange}
                />
              </div>

              <div className="mainBodyTo">
                <SenderReceiver
                  label="Invoice To"
                  initialFields={[
                    {
                      id: "receivername",
                      type: "text",
                      labelText: "Name",
                      placeholder: "Business Name",
                      defaultValue: "",
                    },
                    {
                      id: "receiveremail",
                      type: "email",
                      labelText: "Email",
                      placeholder: "name@business.com",
                      defaultValue: "",
                    },
                    {
                      id: "receivercompany",
                      type: "text",
                      labelText: "Company",
                      placeholder: "Company Name",
                      defaultValue: "",
                    },
                    {
                      id: "receiverphone",
                      type: "text",
                      labelText: "Phone",
                      placeholder: "(123) 456 789",
                      defaultValue: "",
                    },
                    {
                      id: "receiveraddress",
                      type: "textarea",
                      labelText: "Address",
                      placeholder: "Street",
                      defaultValue: "",
                    },
                    {
                      id: "receivercity",
                      type: "text",
                      labelText: "City",
                      placeholder: "Select City",
                      defaultValue: "",
                    },
                    {
                      id: "receivercountry",
                      type: "text",
                      labelText: "Country",
                      placeholder: "Select Country",
                      defaultValue: "",
                    },
                  ]}
                  onFieldsChange={handleFieldsChange}
                />
              </div>
            </div>

            <hr className="hrLine" />
            <div className="invoiceForm">
              {/* <InvoiceForm /> */}

              {/* InvoiceForm Starts */}
              <div className="itemsTable">
                <table className="tableArea">
                  <thead>
                    <tr className="TableHead">
                      <th className="textAction tableHeading"></th>
                      <th className="textDesc tableHeading">DESCRIPTION</th>
                      <th className="textRate tableHeading">RATE</th>
                      {/* <th className="textTax tableHeading">TAX</th> */}
                      <th className="textQty tableHeading">QTY</th>
                      <th className="textAmount tableHeading">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <InvoiceItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        qty={item.qty}
                        itax={item.itax}
                        price={item.price}
                        onDeleteItem={deleteItemHandler}
                        onEdtiItem={edtiItemHandler}
                      />
                    ))}
                  </tbody>
                </table>
                <button className="" type="button" onClick={addItemHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                  >
                    <path
                      d="M7.82422 1.31738V7.31738M7.82422 7.31738V13.3174M7.82422 7.31738H13.8242M7.82422 7.31738H1.82422"
                      stroke="white"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="totalFields">
                <div className="extraOptions">
                  <label>Invoice summary</label>
                  <select
                    id="dropdown"
                    aria-label="Change Currency"
                    className="currencyDrop"
                    onChange={handleCurrencyChange}
                    value={symbol}
                  >
                    <option value="$">USD</option>
                    <option value="£">GBP</option>
                    <option value="¥">JPY</option>
                    <option value="$">CAD</option>
                    <option value="$">AUD</option>
                    <option value="$">SGD</option>
                    <option value="¥">CNY</option>
                    <option value="₿">BTC</option>
                  </select>
                </div>

                {/* Preview Button */}

                {/* cashierName,
              customerName, */}

                <div className="extraOptions">
                  <div className="addRemoveButton">
                    <a className="addRemove" onClick={toggleField}>
                      {buttonText}
                    </a>
                  </div>
                  <div className="addRemoveButton">
                    <a className="addRemove" onClick={toggleField2}>
                      {buttonText2}
                    </a>
                  </div>
                  <div className="addRemoveButton">
                    <a className="addRemove" onClick={toggleField3}>
                      {buttonText3}
                    </a>
                  </div>
                </div>
                <div className="totalFieldContainer">
                  <span className="totalField">Subtotal:</span>
                  <span className="FinalSubTotal">
                    {symbol}
                    {"\u00A0"}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                <div>
                  {showFieldDiscount && (
                    <div className="totalFieldContainer">
                      <span className="totalField">Discount:</span>
                      {/* <span>
            ({discount || "0"}%)${discountRate.toFixed(2)}
          </span> */}
                      <span className="totalSymbols">%</span>
                      <input
                        className=""
                        type="number"
                        name="discount"
                        id="discount"
                        min="0"
                        step="0.01"
                        placeholder="0.0"
                        value={discount}
                        onChange={(event) => setDiscount(event.target.value)}
                      />
                    </div>
                  )}
                </div>
                {/* Taxt Field removed
              <div className="totalFieldContainer">
                <span className="totalField">Tax:</span>
                <span className="totalSymbols">%</span>
                <input
                  className=""
                  type="number"
                  name="tax"
                  id="tax"
                  min="0.01"
                  step="0.01"
                  placeholder="0.0"
                  value={tax}
                  onChange={(event) => setTax(event.target.value)}
                />

                {/* <span>
            ({tax || "0"}%)${taxRate.toFixed(2)}
          </span> 
              </div> */}
                <div>
                  {showField && (
                    <div className="totalFieldContainer">
                      <span className="totalField">GST:</span>
                      <span className="totalSymbols">%</span>
                      <input
                        className=""
                        type="number"
                        name="gst"
                        id="gst"
                        min="0.01"
                        step="0.01"
                        placeholder="0.0"
                        value={gst}
                        onChange={(event) => setGst(event.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div>
                  {showFieldShipping && (
                    <div className="totalFieldContainer">
                      <span className="totalField">Shipping:</span>
                      <span className="totalSymbols">{symbol}</span>
                      <input
                        className=""
                        type="number"
                        name="shipping"
                        id="shipping"
                        min="0.01"
                        step="0.01"
                        placeholder="0.0"
                        value={shipping}
                        onChange={(event) => setShipping(event.target.value)}
                      />

                      {/* <span>
            ({tax || "0"}%)${taxRate.toFixed(2)}
          </span> */}
                    </div>
                  )}
                </div>
                <div className="totalFieldContainer">
                  <span className="totalField">Total:</span>
                  <span className="FinalTotal">
                    {symbol}
                    {"\u00A0"}
                    {total % 1 === 0 ? total : total.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Notes */}
              <div className="Notes">
                <p className="labelNotes">Add Note ( Optional )</p>
                <input
                  type="text"
                  className="lael-input"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                ></input>
              </div>
              <div className="formHeader">
                <div className="itemHeader">
                  <ImageUploader
                    inputId="stampFile"
                    uploadUrl="YOUR_URL_2"
                    onImageChange={(imageData) => {
                      // Handle image data update for this specific usage
                    }}
                  />
                </div>

                <div className="itemHeader">
                  <div className="upload">
                    <div className="uploadLogo">Upload Stamp</div>
                    <div className="textWrapper">
                      <p className="text">
                        120 x 120 pixels @ 72 DPI,
                        <br />
                        Maximum size of 1MB.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="itemHeader">
                  <div className="signature">
                    <p className="signText">Signature</p>
                    <SignaturePopup />
                  </div>
                </div>
              </div>

              {/* InvoiceForm Ends */}
            </div>
            {/* Body Ends */}
          </div>
        </form>
      </div>

      <div className="sidebarOption">
        <button className="sidebar-btn">
          {/* onClick={handleDownloadClick} */}
          <span>0</span>
          <span>PDF Download</span>
        </button>
        <button className="sidebar-btn">
          <span>0</span>
          <span>E-mail Invoice</span>
        </button>
        <button className="sidebar-btn">
          <span>0</span>
          <span>Print Invoice</span>
        </button>
        {/* <button className="sidebar-btn">
        <span>
          0
        </span>
        <span>Delete Invoice</span>
      </button> */}
        <div className="color-picker-container">
          {predefinedColors.map((color, index) => (
            <div
              key={color}
              className="color-box"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
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
          <span>0</span>
          <span>New Item Field</span>
        </button>
      </div>
    </div>
  );
}

export default MainForm;
