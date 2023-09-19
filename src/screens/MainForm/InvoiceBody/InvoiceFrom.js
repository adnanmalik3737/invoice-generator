import React from "react";
import "./InvoiceBody.css";

// const [subTotal, setSubTotal] = useState(0);

// useEffect(() => {
//   const newSubtotal = items.reduce((prev, curr) => {
//     if (curr.name.trim().length > 0)
//       return prev + Number(curr.price * Math.floor(curr.qty));
//     else return prev;
//   }, 0);

//   setSubTotal(newSubtotal);
// }, [items]);

// const subtotal = items.reduce((prev, curr) => {
//   if (curr.name.trim().length > 0)
//     return prev + Number(curr.price * Math.floor(curr.qty));
//   else return prev;
// }, 0);

const handleSubmit = async () => {
  // Gather all the form data
  const mainFormData = {
    // ... All your form fields. For example:
    // image: image,
    // uploadedImage: uploadedImage,
    // InvoiceId: InvoiceId,
    invoiceDate: invoiceDate,
    dueDate: dueDate,
    // invoiceFields: invoiceFields,
    fromName: fromName,
    fromEmail: fromEmail,
    fromCompany: fromCompany,
    fromPhone: fromPhone,
    fromAddress: fromAddress,
    fromCountry: fromCountry,
    fromCity: fromCity,
    fromPostalCode: fromPostalCode,
    fromTaxReg: fromTaxReg,
    fromWebsite: fromWebsite,
    toName: toName,
    toEmail: toEmail,
    toCompany: toCompany,
    toPhone: toPhone,
    toAddress: toAddress,
    toCountry: toCountry,
    toCity: toCity,
    toPostalCode: toPostalCode,
    toWebsite: toWebsite,
    // items: items,
    discount: discount,
    tax: tax,
    gst: gst,
    subTotal: subTotal,
    total: total,
    shipping: shipping,
    note: note,
  };

  const response = await axios.post(
    `${baseUrl}/api/invoice/create`,
    mainFormData
  );
  if (response.code === 201) {
    console.log("Success");
  } else if (response.status === 400) {
    console.log(response);
    console.log(response.errors); // or whatever the error message field is named
  } else {
    console.log(response);
    console.log(response.errors); // or whatever the error message field is named
  }
  //   try {
  // } catch (error) {
  //   console.log("Errrorrrrr");
  //   console.log(error.message); // Handle any errors that might come up during the request
  // }
};

function InvoiceFrom() {
  // useState declarations for each From field
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromCompany, setFromCompany] = useState("");
  const [fromPhone, setFromPhone] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [fromPostalCode, setFromPostalCode] = useState("");
  const [fromTaxReg, setFromTaxReg] = useState("");
  const [fromWebsite, setFromWebsite] = useState("");

  // useState declarations for each To field
  const [toName, setToName] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [toCompany, setToCompany] = useState("");
  const [toPhone, setToPhone] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [toCountry, setToCountry] = useState("");
  const [toCity, setToCity] = useState("");
  const [toPostalCode, setToPostalCode] = useState("");
  const [toWebsite, setToWebsite] = useState("");

  return (
    <>
      <div className="mainBody">
        <div className="mainBodyTo">
          <div className="fromBody">
            <div className="From">From</div>
            <div className="invoice-body">
              <label className="">Name</label>
              <input
                className=""
                placeholder="Business Name"
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Email</label>
              <input
                type="email"
                className=""
                placeholder="name@business.com"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Company </label>
              <input
                className=""
                placeholder="Comapny Name"
                value={fromCompany}
                onChange={(e) => setFromCompany(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Phone</label>
              <input
                className=""
                placeholder="(123) 456 789"
                value={fromPhone}
                onChange={(e) => setFromPhone(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Address</label>
              <textarea
                className=""
                placeholder="Street"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Country</label>
              <input
                className=""
                placeholder="Select Country"
                value={fromCountry}
                onChange={(e) => setFromCountry(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">City</label>
              <input
                className=""
                placeholder="Select City"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
              />
            </div>
            <div className="invoice-body">
              <label className="">Postal Code</label>
              <input
                className=""
                placeholder="000000"
                value={fromPostalCode}
                onChange={(e) => setFromPostalCode(e.target.value)}
              />
            </div>
            <div className="invoice-body">
              <label className="">Tax Reg.</label>
              <input
                className=""
                placeholder="Tax Registration"
                value={fromTaxReg}
                onChange={(e) => setFromTaxReg(e.target.value)}
              />
            </div>
            <div className="invoice-body">
              <label className="">Website</label>
              <input
                className=""
                placeholder="www.domian.com"
                value={fromWebsite}
                onChange={(e) => setFromWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mainBodyTo">
          {/* <SenderReceiver
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
                /> */}
          <div className="fromBody">
            <div className="From">To</div>
            <div className="invoice-body">
              <label className="">Name</label>
              <input
                className=""
                placeholder="Business Name"
                value={toName}
                onChange={(e) => setToName(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Email</label>
              <input
                type="email"
                className=""
                placeholder="name@business.com"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Company </label>
              <input
                className=""
                placeholder="Comapny Name"
                value={toCompany}
                onChange={(e) => setToCompany(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Phone</label>
              <input
                className=""
                placeholder="(123) 456 789"
                value={toPhone}
                onChange={(e) => setToPhone(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Address</label>
              <textarea
                className=""
                placeholder="Street"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">Country</label>
              <input
                className=""
                placeholder="Select Country"
                value={toCountry}
                onChange={(e) => setToCountry(e.target.value)}
              />
            </div>

            <div className="invoice-body">
              <label className="">City</label>
              <input
                className=""
                placeholder="Select City"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
              />
            </div>
            <div className="invoice-body">
              <label className="">Postal Code</label>
              <input
                className=""
                placeholder="000000"
                value={toPostalCode}
                onChange={(e) => setToPostalCode(e.target.value)}
              />
            </div>
            <div className="invoice-body">
              <label className="">Website</label>
              <input
                className=""
                placeholder="www.domian.com"
                value={toWebsite}
                onChange={(e) => setToWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceFrom;
