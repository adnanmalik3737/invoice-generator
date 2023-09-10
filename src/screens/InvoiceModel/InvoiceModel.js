// import React, { Fragment } from "react";
// import React, { useState } from "react";
import React, { Fragment, useState } from "react";
import "./Model.css";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import ImageUploader from "../MainForm/FileUpload";
import "../MainForm/invoiceHeader/invoiceHeader.css";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceModel = ({
  isOpen,
  setIsOpen,
  // invoiceInfo,
  invoiceInfo: invoiceInfoProp,
  items,
  onAddNextInvoice,
  uploadedImage,
  selectedColor,
  // invoice = {},
  invoice: invoiceProp = {},
}) => {
  // const { invoiceInfo } = invoice;
  // console.log(invoice);
  // console.log(invoiceInfo);
  const invoiceData = invoiceProp.fromName ? invoiceProp : invoiceInfoProp;

  function closeModal() {
    setIsOpen(false);
  }

  // const fieldItems = [];

  // invoiceFields, // pass as prop inside the const InvoiceModel = ({

  // for (const field of invoiceFields) {
  //   fieldItems.push(
  //     <div key={field.id} className="extraOptions">
  //       <div className="previewLabel">{field.labelText}:</div>
  //       <div className="previewText">{field.value}</div>
  //     </div>
  //   );
  // }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [5.5, 8.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          // pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
          pdf.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    SaveAsPDFHandler,
    (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="modelView" onClose={closeModal}>
          <div className="innerModel">
            {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="innerDialog" />
          </Transition.Child> */}

            {/* This element is to trick the browser into centering the modal contents.
          <span
            className="WhiteSpace"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="transitionAll modelBox">
                <div
                  className="colorField"
                  style={{
                    backgroundColor: selectedColor,
                    height: 5,
                  }}
                ></div>
                <button className="modelClose" onClick={closeModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M1.51855 16.5522L16.5186 1.55225M1.51855 1.55225L16.5186 16.5522"
                      stroke="#009BD6"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="boxA" id="print">
                  <div className="previewHeader">
                    <div className="PreviewHeaderItem">
                      {uploadedImage && (
                        <img src={uploadedImage} alt="Uploaded" />
                      )}
                    </div>
                    <h1 className="h-1 PreviewHeaderItem">INVOICE</h1>
                  </div>

                  <div className="">
                    <div className="invoiceInfo">
                      <div className="infoItem">
                        <span className="inputItem">Invoice Number:</span>
                        <span className="previewText">
                          {invoiceData.invoiceNumber}
                        </span>
                      </div>
                      <div className="infoItem">
                        <span className="inputItem">Invoice Date:</span>
                        <span className="previewText">
                          {invoiceData.invoiceDate}
                        </span>
                      </div>

                      <div className="infoItem">
                        <span className="inputItem">Due Date:</span>
                        <span className="previewText">
                          {invoiceData.dueDate}
                        </span>
                      </div>
                      <div className="PreviewToFromFields">
                        <div className="PreviewToFields">
                          <div className="toFromTitle">From</div>
                          <div className="tofromFieldsModel">
                            {/* <div className="previewLabel"></div> */}
                            <div className="previewText">
                              {invoiceData.fromName}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromEmail}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromCompany}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromPhone}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromAddress}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromCountry}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromCity}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromPostalCode}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromTaxReg}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.fromWebsite}
                            </div>
                          </div>
                        </div>
                        <div className="PreviewToFields">
                          <div className="toFromTitle">Bill To</div>
                          <div className="tofromFieldsModel">
                            {/* <div className="previewLabel"></div> */}
                            <div className="previewText">
                              {invoiceData.toName}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toEmail}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toCompany}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toPhone}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toAddress}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toCountry}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toCity}
                            </div>
                          </div>
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toPostalCode}
                            </div>
                          </div>
                          {/* <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toTaxReg}
                            </div>
                          </div> */}
                          <div className="tofromFieldsModel">
                            <div className="previewText">
                              {invoiceData.toWebsite}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <table className="modelTable">
                      <thead>
                        <tr className="tableHead">
                          <th className="text-left">DESCRIPTION</th>
                          <th className="">QTY</th>
                          <th className="">PRICE</th>
                          <th className="">AMOUNT</th>
                        </tr>
                      </thead>
                      {/* <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="previewText text-left">
                              {item.name}
                            </td>
                            <td className="min-w-[50px] text-center">
                              {item.qty}
                            </td>
                            <td className="previewText">
                              {invoiceData?.symbol ?? "$"}
                              {Number(item.price).toFixed(2)}
                            </td>
                            <td className="previewText">
                              {invoiceData?.symbol ?? "$"}
                              {Number(item.price * item.qty).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody> */}
                      <tbody>
                        {items &&
                          items.map((item) => (
                            <tr key={item.id}>
                              <td className="previewText text-left">
                                {item?.name}
                              </td>
                              <td className="previewText">{item?.qty}</td>
                              <td className="previewText">
                                {invoiceData?.symbol}
                                {Number(item?.price).toFixed(2)}
                              </td>
                              <td className="previewText">
                                {invoiceData?.symbol}
                                {Number(item?.price * item?.qty).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    <div className="previewTotalFields">
                      <div className="extraOptions">
                        <span className="previewLabel">Subtotal:</span>
                        <span className="previewText">
                          {invoiceData?.symbol ?? "$"}
                          {invoiceData.subtotal}
                          {/* {invoiceData.subtotal.toFixed(2)} */}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Discount:</span>
                        <span className="previewText">
                          {invoiceData?.symbol ?? "$"}
                          {invoiceData.discountRate}
                          {/* {invoiceData.discountRate.toFixed(2)} */}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Tax:</span>
                        <span className="previewText">
                          {invoiceData?.symbol ?? "$"}
                          {invoiceData.gstRate}
                          {/* {invoiceData.taxRate.toFixed(2)} */}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Shipping:</span>
                        <span className="previewText">
                          {invoiceData?.symbol ?? "$"}
                          {invoiceData.shipping}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Total:</span>
                        <span className="previewText">
                          {invoiceData?.symbol ?? "$"}
                          {invoiceData.total % 1 === 0
                            ? invoiceData.total
                            : invoiceData.total}

                          {/* {invoiceData.total % 1 === 0
                            ? invoiceData.total
                            : invoiceData.total.toFixed(2)} */}
                        </span>
                      </div>
                    </div>
                    <div className="previewNotes">{invoiceData.notes}</div>
                  </div>
                </div>
                <div className="clearflex" />
                <div className="">
                  <button className="" onClick={SaveAsPDFHandler}>
                    <span>Download</span>
                  </button>
                  {/* <button onClick={addNextInvoiceHandler} className="">
                    <span>Next</span>
                  </button> */}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
  );
};

export default InvoiceModel;
