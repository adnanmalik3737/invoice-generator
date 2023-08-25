import React, { useState } from "react";
import Body from "./InvoiceBody/InvoiceBody.js";
import "./invoiceHeader/invoiceHeader.css";
import ImageUploader from "./FileUpload.js";
import incrementString from "../helpers/incrementString";
import { uid } from "uid";
import SenderReceiver from "./InvoiceBody/SenderReceiver";
import InvoiceForm from "./InvoiceBody/InvoiceForm.js";

import InvoiceItem from "./InvoiceBody/InvoiceItem";
import InvoiceModel from "../InvoiceModel/InvoiceModel.js";
import SignaturePopup from "./SignaturePopup";

function MainForm(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [invoiceNumber, setInvoiceNumber] = useState(1);

  const date = new Date();
  const today = date.toLocaleDateString("en-GB", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

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

    await fetch("YOUR_URL", {
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
        price: "1.00",
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
  // const [cashierName, setCashierName] = useState('');
  // const [customerName, setCustomerName] = useState('');
  // const [items, setItems] = useState([
  //   {
  //     id: uid(6),
  //     name: "",
  //     qty: 1,
  //     price: "0.00",
  //   },
  // ]);

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

  const handleDropdownChange = (event) => {
    setSymbol(event.target.value);
  };

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  // const addNextInvoiceHandler = () => {
  //   setInvoiceNumber((prevNumber) => incrementString(prevNumber));
  //   setItems([
  //     {
  //       id: uid(6),
  //       name: "",
  //       qty: 1,
  //       price: "1.00",
  //     },
  //   ]);
  // };

  //// InvoiceForm constants

  return (
    <form className="mainForm" onSubmit={reviewInvoiceHandler}>
      <div className="">
        {/* Header Start */}
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
              {/* <input type="date" className="inputItem"></input> */}
              <span className="inputItem">{today}</span>
            </div>
            <div className="infoItem">
              <label className="inputItem">Due Date</label>
              <input type="date" className="inputItem"></input>
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
          {/* <InvoiceForm /> */}

          {/* InvoiceForm Starts */}
          <div className="itemsTable">
            <table className="tableArea">
              <thead>
                <tr className="TableHead">
                  <th className="textAction tableHeading"></th>
                  <th className="textDesc tableHeading">DESCRIPTION</th>
                  <th className="textRate tableHeading">RATE</th>
                  <th className="textTax tableHeading">TAX</th>
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
                onChange={handleDropdownChange}
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
            <div className="extraOptions">
              <button className="reviewBtn" type="submit">
                Review Invoice
              </button>
              <InvoiceModel
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                invoiceInfo={{
                  invoiceNumber,
                  subtotal,
                  taxRate,
                  discountRate,
                  total,
                }}
                items={items}
                // onAddNextInvoice={addNextInvoiceHandler}
              />
            </div>

            {/* invoiceNumber,
              cashierName,
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
          </span> */}
            </div>
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
            <input type="text" className="lael-input"></input>
          </div>
          <div className="formHeader">
            <div className="itemHeader">
              <ImageUploader
                inputId="upload-logo-12"
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
  );
}

export default MainForm;
