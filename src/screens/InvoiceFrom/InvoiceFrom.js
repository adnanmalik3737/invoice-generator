import React, { useState, useEffect } from "react";
import "./InvoiceComponents/invoiceHeader.css";
import ImageUploader from "./InvoiceComponents/FileUpload.js";
import incrementString from "./InvoiceComponents/incrementString";
import { uid } from "uid";
import axios from "axios";
import "../InvoiceFrom/InvoiceComponents/InvoiceBody.css";
import InvoiceItem from "./InvoiceComponents/InvoiceItem";
import InvoiceModel from "../InvoicePreview/InvoicePreview.js";
import SignaturePopup from "./InvoiceComponents/SignaturePopup";
import { useParams } from "react-router-dom";
import mail from "../../img/mail.svg";
import downloadIcon from "../../img/downloadIcon.svg";
import printIcon from "../../img/printIcon.svg";
import Accounts from "../Registration/Accounts";

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

function MainForm(isUserLoggedIn, setIsUserLoggedIn) {
  // const [image, setImage] = useState({ preview: "", raw: "" });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedStamp, setUploadedStamp] = useState(null);
  const [signImage, setSignImage] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [selectedColor, setSelectedColor] = useState();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { invoiceId } = useParams();
  const imageFileURL = "http://35.154.165.203:3000/";

  // For Signature Popup
  const [imageURL, setImageURL] = useState(null);
  const [fetchedStamp, setFetchedStamp] = useState(null);
  const [fetchedLogo, setFetchedLogo] = useState(null);
  const [fetchedSignature, setFetchedSignature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const handleLogin = () => {
    setPopupOpen(true);
  };

  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  //For Editable content
  const [invoiceTitle, setInvoiceTitle] = useState("INVOICE"); // Initial content

  // Editing Invoice
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Make API call to get invoice details
    if (invoiceId) {
      axios
        .get(`${baseUrl}/api/invoice/get/${invoiceId}`)
        .then((response) => {
          let date = response.data.data.invoiceDate;
          let dueDate = response.data.data.dueDate;

          setInvoiceDate(date.substring(0, 10));
          setDueDate(dueDate.substring(0, 10));
          // setInvoiceDate(response.data.data.invoiceDate);
          // setDueDate(response.data.data.dueDate);
          setInvoiceNumber(response.data.data.invoiceNumber);
          setFromName(response.data.data.fromName);
          setInvoiceTitle(response.data.data.invoiceTitle);
          setFromEmail(response.data.data.fromEmail);
          setFromCompany(response.data.data.fromCompany);
          setFromAddress(response.data.data.fromAddress);
          setFromCity(response.data.data.fromCity);
          setFromCountry(response.data.data.fromCountry);
          setFromPhone(response.data.data.fromPhone);
          setFromPostalCode(response.data.data.fromPostalCode);
          setFromTaxReg(response.data.data.fromTaxReg);
          setFromWebsite(response.data.data.fromWebsite);
          setToName(response.data.data.toName);
          setToEmail(response.data.data.toEmail);
          setToCompany(response.data.data.toCompany);
          setToAddress(response.data.data.toAddress);
          setToCity(response.data.data.toCity);
          setToCountry(response.data.data.toCountry);
          setToPhone(response.data.data.toPhone);
          setToPostalCode(response.data.data.toPostalCode);
          setToWebsite(response.data.data.toWebsite);
          setDiscount(response.data.data.discount);
          setBalanceDue(response.data.data.balanceDue);
          setShipping(response.data.data.shipping);
          setBalanceDue(response.data.data.balanceDue);
          setNote(response.data.data.note);
          setFetchedStamp(response.data.data.stamp);
          setSymbol(response.data.data.symbol);
          setFetchedSignature(response.data.data.signature);
          setFetchedLogo(response.data.data.logo);

          const invoiceItem = response.data.data.Items.map((item) => ({
            id: item.itemId,
            itemId: item.itemId,
            name: item.title,
            itax: item.tax,
            quantity: item.quantity,
            price: item.rate,
          }));
          // console.log(invoiceItem);
          setItems(invoiceItem);
        })
        .catch((error) => {
          console.error("Error fetching Invoice details:", error);
        });

      // if (notification) {
      //   const timeout = setTimeout(() => {
      //     setNotification("");
      //   }, 4000); // Set the timeout duration in milliseconds (10 seconds)

      //   return () => {
      //     clearTimeout(timeout); // Clear the timeout when the component unmounts
      //   };
      // }
    }
  }, [invoiceId]);

  // useState declarations for each From field
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromCompany, setFromCompany] = useState("");
  const [fromPhone, setFromPhone] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromPostalCode, setFromPostalCode] = useState();
  const [fromTaxReg, setFromTaxReg] = useState();
  const [fromWebsite, setFromWebsite] = useState("");

  // useState declarations for each To field
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [toCompany, setToCompany] = useState("");
  const [toPhone, setToPhone] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [toCity, setToCity] = useState("");
  const [toPostalCode, setToPostalCode] = useState();
  const [toWebsite, setToWebsite] = useState("");

  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      quantity: 1,
      price: "0.00",
      itax: "0",
    },
  ]);

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        quantity: 1,
        price: "0.00",
        itax: "0",
      },
    ]);
  };

  // InvoiceForm constants
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [gst, setGst] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [note, setNote] = useState("");

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        quantity: 1,
        price: "0.00",
        itax: "0",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    if (event.target.name == "itax") {
      if (event.target.value < 0) {
        return;
      }
    }
    if (event.target.name == "quantity") {
      if (event.target.value < 0) {
        return;
      }
    }
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

  const subTotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0) {
      const taxvalue = curr.price * curr.itax;
      const taxPercent = taxvalue / 100;
      const taxAmount = parseFloat(curr.price) + parseFloat(taxPercent);
      return prev + Number(taxAmount * Math.floor(curr.quantity));
      // return prev + Number(curr.price * Math.floor(curr.quantity));
    } else return prev;
  }, 0);
  const taxRate = (tax * subTotal) / 100;
  const gstRate = (gst * subTotal) / 100;
  const discountRate = (discount * subTotal) / 100;
  const shippingAmount = parseFloat(shipping);
  const balanceDueAmount = parseFloat(balanceDue);
  const total =
    subTotal -
    discountRate +
    taxRate +
    gstRate +
    shippingAmount +
    balanceDueAmount;

  const [symbol, setSymbol] = useState("$"); // default to USD

  const handleCurrencyChange = (event) => {
    setSymbol(event.target.value);
  };

  const [shouldPrintPDF, setShouldPrintPDF] = useState(false);
  const [shouldSavePDF, setShouldSavePDF] = useState(false);
  const [shouldEmailPDF, setShouldEmailPDF] = useState(false);

  const reviewInvoiceHandler = (e) => {
    e.preventDefault();
    if (invoiceDate.trim() === "") {
      alert("Invoice date is required.");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(fromEmail)) {
      alert("Invalid From Email");
      return;
    }
    if (!emailPattern.test(toEmail)) {
      alert("Invalid To Email");
      return;
    }

    setIsOpen(true);
    setShouldPrintPDF(false); // Reset the flag when opening the modal via reviewInvoiceHandler
    setShouldSavePDF(false);
    setShouldEmailPDF(false);
    // handleSubmit();
  };

  const openModalAndPrint = () => {
    if (invoiceDate.trim() === "") {
      alert("Invoice date is required.");
      return;
    }
    if (dueDate.trim() === "") {
      alert("Due date is required.");
      return;
    }
    if (fromName.trim() === "") {
      alert("Sender name is required.");
      return;
    }
    if (fromEmail.trim() === "") {
      alert("Sender email is required.");
      return;
    }
    if (fromPhone.trim() === "") {
      alert("Sender phone is required.");
      return;
    }
    if (toName.trim() === "") {
      alert("Sending to name is required.");
      return;
    }
    if (toEmail.trim() === "") {
      alert("Sending to email is required.");
      return;
    }

    setIsOpen(true);
    setShouldPrintPDF(true);
  };

  const openModalAndSave = () => {
    if (invoiceDate.trim() === "") {
      alert("Invoice date is required.");
      return;
    }
    if (dueDate.trim() === "") {
      alert("Due date is required.");
      return;
    }
    if (fromName.trim() === "") {
      alert("Sender name is required.");
      return;
    }
    if (fromEmail.trim() === "") {
      alert("Sender email is required.");
      return;
    }
    if (fromPhone.trim() === "") {
      alert("Sender phone is required.");
      return;
    }
    if (toName.trim() === "") {
      alert("Sending to name is required.");
      return;
    }
    if (toEmail.trim() === "") {
      alert("Sending to email is required.");
      return;
    }

    setIsOpen(true); // Open the InvoiceModel modal
    setShouldSavePDF(true); // Set the flag to true when opening via Print button
  };

  const openModalAndEmail = () => {
    if (invoiceDate.trim() === "") {
      alert("Invoice date is required.");
      return;
    }
    if (dueDate.trim() === "") {
      alert("Due date is required.");
      return;
    }
    if (fromName.trim() === "") {
      alert("Sender name is required.");
      return;
    }
    if (fromEmail.trim() === "") {
      alert("Sender email is required.");
      return;
    }
    if (fromPhone.trim() === "") {
      alert("Sender phone is required.");
      return;
    }
    if (toName.trim() === "") {
      alert("Sending to name is required.");
      return;
    }
    if (toEmail.trim() === "") {
      alert("Sending to email is required.");
      return;
    }

    setIsOpen(true);
    setShouldEmailPDF(true);
    setIsSending(true);
  };

  // Append Method Used Below

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (invoiceDate.trim() === "") {
      alert("Invoice date is required.");
      return;
    }
    if (dueDate.trim() === "") {
      alert("Due date is required.");
      return;
    }
    if (fromName.trim() === "") {
      alert("Sender name is required.");
      return;
    }
    if (fromEmail.trim() === "") {
      alert("Sender email is required.");
      return;
    }
    if (fromPhone.trim() === "") {
      alert("Sender phone is required.");
      return;
    }
    if (toName.trim() === "") {
      alert("Sending to name is required.");
      return;
    }
    if (toEmail.trim() === "") {
      alert("Sending to email is required.");
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(fromEmail)) {
      alert("Invalid From Email");
      return;
    }
    if (!emailPattern.test(toEmail)) {
      alert("Invalid To Email");
      return;
    }

    const mitems = items.map((item) => ({
      itemId: item.itemId,
      title: item.name,
      tax: item.itax,
      quantity: parseFloat(item.quantity),
      rate: parseFloat(item.price),
    }));
    const mainFormData = new FormData();

    // Conditionally append the logo if it exists
    if (uploadedImage) {
      mainFormData.append("logo", uploadedImage.raw);
    }
    if (signImage) {
      mainFormData.append("signature", signImage.raw);
    }

    // Conditionally append the signature if it exists
    if (imageURL) {
      const fetchRes = await fetch(imageURL);
      const blob = await fetchRes.blob();
      mainFormData.append("signature", blob, "signature.png");
    }

    // Conditionally append the stamp if it exists
    if (uploadedStamp) {
      mainFormData.append("stamp", uploadedStamp.raw);
    }

    // Append other fields

    mainFormData.append("invoiceNumber", invoiceNumber);
    mainFormData.append("invoiceTitle", invoiceTitle);
    mainFormData.append("invoiceDate", invoiceDate);
    mainFormData.append("dueDate", dueDate);
    mainFormData.append("fromName", fromName);
    mainFormData.append("fromEmail", fromEmail);
    mainFormData.append("fromCompany", fromCompany);
    mainFormData.append("fromPhone", fromPhone);
    mainFormData.append("fromAddress", fromAddress);
    mainFormData.append("fromCountry", fromCountry);
    mainFormData.append("fromCity", fromCity);
    mainFormData.append("fromPostalCode", fromPostalCode);
    mainFormData.append("fromTaxReg", fromTaxReg);
    mainFormData.append("fromWebsite", fromWebsite);
    mainFormData.append("toName", toName);
    mainFormData.append("toEmail", toEmail);
    mainFormData.append("toCompany", toCompany);
    mainFormData.append("toPhone", toPhone);
    mainFormData.append("toAddress", toAddress);
    mainFormData.append("toCountry", toCountry);
    mainFormData.append("toCity", toCity);
    mainFormData.append("toPostalCode", toPostalCode);
    mainFormData.append("toWebsite", toWebsite);
    mainFormData.append("invoiceItems", JSON.stringify(mitems));
    mainFormData.append("discount", discount);
    mainFormData.append("tax", gstRate);
    mainFormData.append("subTotal", subTotal);
    mainFormData.append("total", total);
    mainFormData.append("balanceDue", balanceDue);
    mainFormData.append("shipping", shipping);
    mainFormData.append("note", note);
    mainFormData.append("symbol", symbol);

    for (let pair of mainFormData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl}/api/invoice/create`,
        mainFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.code === 201) {
        setIsLoading(false);
        console.log("Success");
        alert("Success! Invoice Saved");
        console.log(mitems);
        // window.location.reload();
        // console.log(uploadedImage);
        // console.log(imageURL);
      } else if (response.data.code === 500) {
        setIsLoading(false);
        console.log(response);
        console.log(response.errors); // or whatever the error message field is named
        console.log(response.data.message);
      } else if (response.data.code === 401) {
        setIsLoading(false);
        console.log(response.data.message);
        alert("User not logged in, Press OK to login");
        setPopupOpen(true);
      } else if (response.status === 200) {
        setIsLoading(false);
        console.error(response.data.errors);
      } else {
        setIsLoading(false);
        console.log(response.errors); // or whatever the error message field is named
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Errrorrrrr");
      console.log(error.message); // Handle any errors that might come up during the request
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(fromEmail)) {
      alert("Invalid From Email");
      return;
    }
    if (!emailPattern.test(toEmail)) {
      alert("Invalid To Email");
      return;
    }

    const mitems = items.map((item) => ({
      title: item.name,
      tax: item.itax,
      quantity: parseFloat(item.quantity),
      rate: parseFloat(item.price),
    }));
    const mainFormData = new FormData();

    // Conditionally append the logo if it exists
    if (uploadedImage) {
      mainFormData.append("logo", uploadedImage.raw);
    }

    // Conditionally append the signature if it exists
    if (imageURL) {
      const fetchRes = await fetch(imageURL);
      const blob = await fetchRes.blob();
      mainFormData.append("signature", blob, "signature.png");
    }

    // Conditionally append the stamp if it exists
    if (uploadedStamp) {
      mainFormData.append("stamp", uploadedStamp.raw);
    }

    // Append other fields
    mainFormData.append("invoiceDate", invoiceDate);
    mainFormData.append("dueDate", dueDate);
    mainFormData.append("invoiceNumber", invoiceNumber);
    mainFormData.append("invoiceTitle", invoiceTitle);
    mainFormData.append("fromName", fromName);
    mainFormData.append("fromEmail", fromEmail);
    mainFormData.append("fromCompany", fromCompany);
    mainFormData.append("fromPhone", fromPhone);
    mainFormData.append("fromAddress", fromAddress);
    mainFormData.append("fromCountry", fromCountry);
    mainFormData.append("fromCity", fromCity);
    mainFormData.append("fromPostalCode", fromPostalCode);
    mainFormData.append("fromTaxReg", fromTaxReg);
    mainFormData.append("fromWebsite", fromWebsite);
    mainFormData.append("toName", toName);
    mainFormData.append("toEmail", toEmail);
    mainFormData.append("toCompany", toCompany);
    mainFormData.append("toPhone", toPhone);
    mainFormData.append("toAddress", toAddress);
    mainFormData.append("toCountry", toCountry);
    mainFormData.append("toCity", toCity);
    mainFormData.append("toPostalCode", toPostalCode);
    mainFormData.append("toWebsite", toWebsite);
    mainFormData.append("invoiceItems", JSON.stringify(mitems));
    mainFormData.append("discount", discount);
    mainFormData.append("tax", gstRate);
    mainFormData.append("subTotal", subTotal);
    mainFormData.append("total", total);
    mainFormData.append("balanceDue", balanceDue);
    mainFormData.append("shipping", shipping);
    mainFormData.append("note", note);
    mainFormData.append("symbol", symbol);

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${baseUrl}/api/invoice/update/${invoiceId}`,
        mainFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // setNotification("Invoice Updated successfully ");
        setIsLoading(false);

        console.log("Invoice Updated successfully");
        // Clear form and data
        alert("Success! Invoice Updated");
      } else if (response.status === 400) {
        setIsLoading(false);
        alert("Error updating Invoice");
        console.log(response.errors);
      } else {
        setIsLoading(false);

        // setNotification("Invoice Update failed");

        console.error("Error updating Invoice");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Errrorrrrr");
      console.log(error.message); // Handle any errors that might come up during the request
    }
  };

  const [imgSignSelector, setImgSignSelector] = useState("");

  const handleImgSignChange = (event) => {
    setImgSignSelector(event.target.value);
  };

  return (
    <div className="wholeFormBody">
      <div className="mainForm">
        <Accounts
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          setIsUserLoggedIn={setIsUserLoggedIn}
        />
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
                fromName,
                fromEmail,
                fromCompany,
                fromPhone,
                fromAddress,
                fromCountry,
                fromCity,
                fromPostalCode,
                fromTaxReg,
                fromWebsite,
                toName,
                toEmail,
                toCompany,
                toPhone,
                toAddress,
                toCountry,
                toCity,
                toPostalCode,
                toWebsite,
                dueDate,
                subTotal,
                gst,
                gstRate,
                discount,
                discountRate,
                symbol,
                shipping,
                balanceDue,
                total,
                note,
                selectedColor,
                invoiceTitle,
              }}
              selectedColor={selectedColor}
              items={items}
              onAddNextInvoice={addNextInvoiceHandler}
              uploadedImage={uploadedImage}
              uploadedStamp={uploadedStamp}
              signImage={signImage}
              imageURL={imageURL}
            />
            {notification && (
              <div className="updateNotification" role="alert">
                {notification}
              </div>
            )}

            {invoiceId ? (
              <button className="invoiceTopBtn" onClick={handleUpdateSubmit}>
                <span>Update</span>
              </button>
            ) : (
              <button
                className="invoiceTopBtn largeButton"
                onClick={handleSubmit}
              >
                <span>{isLoading ? <>Saving...</> : <>Save for later</>}</span>
              </button>
            )}

            {/* <input className="invoiceTopBtn" type="reset" value="Reset" /> */}

            {/* <button className="invoiceTopBtn">
              <span>Reset</span>
            </button> */}
          </div>
          <div className="mainFormBody">
            <div
              className="colorField"
              style={{
                backgroundColor: selectedColor,
                height: 5,
              }}
            ></div>
            {/* Header Start */}
            <div className="formHeader">
              <div className="itemHeader">
                <ImageUploader
                  inputId="logoFile"
                  uploadUrl="YOUR_URL"
                  onImageChange={(imageData) => {
                    setUploadedImage(imageData);
                  }}
                />
                {invoiceId && fetchedLogo ? (
                  <div className="itemHeader">
                    <img
                      src={`${baseUrl}/${fetchedLogo}`}
                      alt="Stamp"
                      height={100}
                      width={100}
                    />
                  </div>
                ) : (
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
                )}
              </div>

              <div className="itemHeader">
                <input
                  required
                  className="itemHeader h-1"
                  type="test"
                  name="invoiceTitle"
                  id="invoiceTitle"
                  maxLength="15"
                  value={invoiceTitle}
                  onChange={(event) => setInvoiceTitle(event.target.value)}
                />
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
                    maxLength="10"
                    value={invoiceNumber}
                    onChange={(event) => setInvoiceNumber(event.target.value)}
                  />
                </div>
                <div className="infoItem">
                  <label className="inputItem">Invoice Date *</label>
                  <input
                    type="date"
                    className="inputItem"
                    value={invoiceDate}
                    onChange={(event) => setInvoiceDate(event.target.value)}
                  />
                </div>
                <div className="infoItem">
                  <label className="inputItem">Due Date *</label>
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
                <div className="fromBody">
                  <div className="From">From</div>
                  <div className="invoice-body">
                    <label className="">Name *</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Business Name"
                      value={fromName}
                      // required
                      onChange={(e) => setFromName(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Email *</label>
                    <input
                      type="email"
                      className=""
                      placeholder="name@business.com"
                      value={fromEmail}
                      required
                      onChange={(e) => {
                        setFromEmail(e.target.value);
                      }}
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Company </label>
                    <input
                      className=""
                      type="text"
                      maxLength="50"
                      placeholder="Company Name"
                      value={fromCompany}
                      onChange={(e) => setFromCompany(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Phone *</label>
                    <input
                      type="number"
                      maxLength="30"
                      className=""
                      placeholder="(123) 456 789"
                      value={fromPhone}
                      required
                      onChange={(e) => setFromPhone(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Address</label>
                    <textarea
                      maxLength="200"
                      className=""
                      placeholder="Street"
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Country</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Select Country"
                      value={fromCountry}
                      onChange={(e) => setFromCountry(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">City</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Select City"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                    />
                  </div>
                  <div className="invoice-body">
                    <label className="">Postal Code</label>
                    <input
                      type="text"
                      maxLength="15"
                      className=""
                      placeholder="000000"
                      value={fromPostalCode}
                      onChange={(e) => setFromPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="invoice-body">
                    <label className="">Tax Reg.</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Tax Registration"
                      value={fromTaxReg}
                      onChange={(e) => setFromTaxReg(e.target.value)}
                    />
                  </div>
                  <div className="invoice-body">
                    <label className="">Website</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="www.domian.com"
                      value={fromWebsite}
                      onChange={(e) => setFromWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mainBodyTo">
                <div className="fromBody">
                  <div className="From">To</div>
                  <div className="invoice-body">
                    <label className="">Name *</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Business Name"
                      value={toName}
                      required
                      onChange={(e) => setToName(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Email *</label>
                    <input
                      type="email"
                      className=""
                      placeholder="name@business.com"
                      value={toEmail}
                      required
                      onChange={(e) => setToEmail(e.target.value)}
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Company </label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Company Name"
                      value={toCompany}
                      onChange={(e) => setToCompany(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Phone</label>
                    <input
                      type="number"
                      maxLength="30"
                      className=""
                      placeholder="(123) 456 789"
                      value={toPhone}
                      onChange={(e) => setToPhone(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Address</label>
                    <textarea
                      maxLength="200"
                      className=""
                      placeholder="Street"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">Country</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Select Country"
                      value={toCountry}
                      onChange={(e) => setToCountry(e.target.value)}
                    />
                  </div>

                  <div className="invoice-body">
                    <label className="">City</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="Select City"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                    />
                  </div>
                  <div className="invoice-body">
                    <label className="">Postal Code</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="000000"
                      value={toPostalCode}
                      onChange={(e) => setToPostalCode(e.target.value)}
                    />
                  </div>
                  {/* <div className="invoice-body">
                    <label className="">Tax Reg.</label>
                    <input
                      className=""
                      placeholder="Tax Registration"
                      value={toTaxReg}
                      onChange={(e) => setToTaxReg(e.target.value)}
                    />
                  </div> */}
                  <div className="invoice-body">
                    <label className="">Website</label>
                    <input
                      type="text"
                      maxLength="30"
                      className=""
                      placeholder="www.domian.com"
                      value={toWebsite}
                      onChange={(e) => setToWebsite(e.target.value)}
                    />
                  </div>
                </div>
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
                      <th className="textDesc tableHeading">DESCRIPTION *</th>
                      <th className="textRate tableHeading">RATE *</th>
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
                        quantity={item.quantity}
                        itax={item.itax}
                        price={item.price}
                        onDeleteItem={deleteItemHandler}
                        onEdtiItem={edtiItemHandler}
                      />
                    ))}
                  </tbody>
                </table>
                <div className="tableArea" style={{ margin: 10 }}>
                  <button
                    className="invoiceDeleteIcon"
                    type="button"
                    onClick={addItemHandler}
                    style={{ background: "#009bd6" }}
                  >
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
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="totalFields">
                <div className="extraOptions">
                  <label>Invoice Currency</label>
                  <select
                    id="dropdown"
                    aria-label="Change Currency"
                    className="currencyDrop"
                    onChange={handleCurrencyChange}
                    value={symbol}
                  >
                    <option value="$">$</option>
                    <option value="£">£</option>
                    <option value="¥">¥</option>
                    {/* <option value="$">CAD</option>
                    <option value="$">AUD</option>
                    <option value="$">SGD</option>
                    <option value="¥">CNY</option> */}
                    <option value="₿">₿</option>
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
                    {subTotal.toFixed(2)}
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
                        placeholder="0"
                        // value={discount}
                        // // onChange={(event) => setDiscount(event.target.value)}
                        // onChange={(e) => {
                        //   const value = e.target.value;
                        //   if (value >= 0) {
                        //     setDiscount(e.target.value);
                        //   }
                        // }}
                        value={discount === 0 ? "" : discount}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setDiscount(value);
                          } else {
                            setDiscount(0);
                          }
                        }}
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
                      <span className="totalField">TAX:</span>
                      <span className="totalSymbols">%</span>
                      <input
                        className=""
                        type="number"
                        name="gst"
                        id="gst"
                        step="0.01"
                        min="0"
                        placeholder="0"
                        // value={gst}
                        // // onChange={(event) => setGst(event.target.value)}

                        // onChange={(e) => {
                        //   const value = e.target.value;
                        //   if (value >= 0) {
                        //     setGst(e.target.value);
                        //   }
                        // }}
                        value={gst === 0 ? "" : gst}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setGst(value);
                          } else {
                            setGst(0);
                          }
                        }}
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
                        step="0.01"
                        min="0"
                        placeholder="0"
                        // value={shipping}
                        // // onChange={(event) => setShipping(event.target.value)}
                        // onChange={(e) => {
                        //   const value = e.target.value;
                        //   if (value >= 0) {
                        //     setShipping(e.target.value);
                        //   }
                        // }}
                        value={shipping === 0 ? "" : shipping}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0) {
                            setShipping(value);
                          } else {
                            setShipping(0);
                          }
                        }}
                      />

                      {/* <span>
            ({tax || "0"}%)${taxRate.toFixed(2)}
          </span> */}
                    </div>
                  )}
                </div>
                <div className="totalFieldContainer">
                  <span className="totalField">Balance Due:</span>
                  <span className="totalSymbols">{symbol}</span>
                  <input
                    className=""
                    type="number"
                    name="balanceDue"
                    id="balanceDue"
                    step="0.01"
                    min="0"
                    placeholder="0"
                    // value={balanceDue}
                    // // onChange={(event) => setBalanceDue(event.target.value)}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   if (value >= 0) {
                    //     setBalanceDue(e.target.value);
                    //   }
                    // }}
                    value={balanceDue === 0 ? "" : balanceDue} // If balanceDue is 0, show an empty string in the input
                    onChange={(e) => {
                      const value = parseFloat(e.target.value); // Parse the input value as a float
                      if (!isNaN(value) && value >= 0) {
                        // Check if the parsed value is a number and greater than or equal to 0
                        setBalanceDue(value); // Update balanceDue with the valid input value
                      } else {
                        setBalanceDue(0); // If input is not a valid number, set balanceDue to 0
                      }
                    }}
                  />
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
                <textarea
                  type="text"
                  maxLength="200"
                  className="lael-input"
                  name="note"
                  placeholder="Notes..."
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                ></textarea>
              </div>
              <div className="formHeader">
                {/* <div className={` ${invoiceId ? "smallUploader" : "itemHeader"}`}> */}
                <div className="itemHeader">
                  <ImageUploader
                    inputId="stampFile"
                    uploadUrl="YOUR_URL_2"
                    onImageChange={(imageData) => {
                      setUploadedStamp(imageData);
                    }}
                  />

                  {invoiceId && fetchedStamp ? (
                    <div className="itemHeader">
                      <img
                        src={`${baseUrl}/${fetchedStamp}`}
                        alt="Stamp"
                        height={100}
                        width={100}
                      />
                    </div>
                  ) : (
                    <div className="itemHeader">
                      <div className="upload">
                        <div className="uploadLogo">Upload Stamp</div>
                        <div className="textWrapper">
                          <p className="text">
                            240 x 240 pixels @ 72 DPI,
                            <br />
                            Maximum size of 1MB.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="itemHeader">
                  <div className="signature">
                    <p className="signText">Signature</p>
                    <SignaturePopup
                      imageURL={imageURL}
                      setImageURL={setImageURL}
                    />
                  </div>
                </div> */}

                {invoiceId && fetchedSignature && (
                  <div className="itemHeader">
                    <img
                      src={`${baseUrl}/${fetchedSignature}`}
                      alt="Stamp"
                      // height={120}
                      width={100}
                    />
                  </div>
                )}

                <div className="itemHeader verticalItemHead">
                  <p className="signText">Signature</p>
                  <div className="imgSignSelector">
                    <div className="signInput">
                      <input
                        type="radio"
                        value="signature"
                        checked={imgSignSelector === "signature"}
                        onChange={handleImgSignChange}
                      />
                      <label className="signLabel">Create Sign</label>
                    </div>
                    <div className="imageInput">
                      <input
                        type="radio"
                        value="image"
                        checked={imgSignSelector === "image"}
                        onChange={handleImgSignChange}
                      />
                      <label className="signLabel">Upload Image</label>
                    </div>
                  </div>
                  <div>
                    {imgSignSelector === "signature" && (
                      <SignaturePopup
                        imageURL={imageURL}
                        setImageURL={setImageURL}
                      />
                    )}
                    {imgSignSelector === "image" && (
                      <ImageUploader
                        inputId="signFile"
                        uploadUrl="YOUR_URL_3"
                        onImageChange={(imageData) => {
                          setSignImage(imageData);
                        }}
                      />
                    )}
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
        <button className="sidebar-btn" onClick={openModalAndSave}>
          {/* onClick={handleDownloadClick} */}
          <span>
            <img src={downloadIcon} width={15}></img>
          </span>
          <span className="text">PDF Download</span>
        </button>
        <button className="sidebar-btn" onClick={openModalAndEmail}>
          <span>
            <img src={mail} width={15}></img>
          </span>
          <span className="text">
            {isSending ? <>Loading...</> : <>E-mail Invoice</>}
          </span>
        </button>
        <button className="sidebar-btn" onClick={openModalAndPrint}>
          <span>
            <img src={printIcon} width={15}></img>
          </span>
          <span className="text">Print Invoice</span>
        </button>
        {/* <InvoiceModel /> */}

        <InvoiceModel
          isOpen={isOpen}
          isSending={isSending}
          setIsSending={setIsSending}
          shouldPrintPDF={shouldPrintPDF}
          setShouldPrintPDF={setShouldPrintPDF}
          shouldSavePDF={shouldSavePDF}
          setShouldSavePDF={setShouldSavePDF}
          shouldEmailPDF={shouldEmailPDF}
          setShouldEmailPDF={setShouldEmailPDF}
          setIsOpen={setIsOpen}
          invoiceInfo={{
            invoiceNumber,
            invoiceDate,
            fromName,
            fromEmail,
            fromCompany,
            fromPhone,
            fromAddress,
            fromCountry,
            fromCity,
            fromPostalCode,
            fromTaxReg,
            fromWebsite,
            toName,
            toEmail,
            toCompany,
            toPhone,
            toAddress,
            toCountry,
            toCity,
            toPostalCode,
            toWebsite,
            dueDate,
            subTotal,
            gst,
            gstRate,
            discount,
            discountRate,
            symbol,
            balanceDue,
            shipping,
            total,
            note: note,
            selectedColor,
            invoiceTitle,
          }}
          items={items}
          onAddNextInvoice={addNextInvoiceHandler}
          uploadedImage={uploadedImage}
          uploadedStamp={uploadedStamp}
          signImage={signImage}
          imageURL={imageURL}
        />
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
                    fillRule="evenodd"
                    clipRule="evenodd"
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
      </div> 
      <button
          className="sidebar-btn dotted"
          onClick={() => {
            
          }}
        >
          <span>0</span>
          <span>New Item Field</span>
        </button> */}
      </div>
    </div>
  );
}

export default MainForm;
