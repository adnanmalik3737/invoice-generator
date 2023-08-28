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
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

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
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  const [uploadedImage, setUploadedImage] = useState({ preview: "", raw: "" });

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
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div className="boxA" id="print">
                  <div className="previewHeader">
                    <div className="PreviewHeaderItem">
                      {/* <img
                        src={uploadedImage.preview}
                        alt="Uploaded"
                        width="200"
                        height="200"
                      /> */}
                    </div>
                    <h1 className="h-1 PreviewHeaderItem">INVOICE</h1>
                  </div>

                  <div className="">
                    <div className="invoiceInfo">
                      <div className="infoItem">
                        <span className="inputItem">Invoice Number:</span>
                        <span className="previewText">
                          {invoiceInfo.invoiceNumber}
                        </span>

                        {/* <span className="previewLabel">Cashier:</span>
                    <span>{invoiceInfo.cashierName}</span>
                    <span className="previewLabel">Customer:</span>
                    <span>{invoiceInfo.customerName}</span> */}
                      </div>
                      <div className="infoItem">
                        <span className="inputItem">Invoice Date:</span>
                        <span className="previewText">{today}</span>
                      </div>

                      <div className="infoItem">
                        <span className="inputItem">Due Date:</span>
                        <span className="previewText">{today}</span>
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
                      <tbody>
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="previewText text-left">
                              {item.name}
                            </td>
                            <td className="min-w-[50px] text-center">
                              {item.qty}
                            </td>
                            <td className="previewText">
                              ${Number(item.price).toFixed(2)}
                            </td>
                            <td className="previewText">
                              ${Number(item.price * item.qty).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="previewTotalFields">
                      <div className="extraOptions">
                        <span className="previewLabel">Subtotal:</span>
                        <span className="previewText">
                          ${invoiceInfo.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Discount:</span>
                        <span className="previewText">
                          ${invoiceInfo.discountRate.toFixed(2)}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Tax:</span>
                        <span className="previewText">
                          ${invoiceInfo.taxRate.toFixed(2)}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Shipping:</span>
                        <span className="previewText">
                          ${invoiceInfo.shipping}
                        </span>
                      </div>
                      <div className="extraOptions">
                        <span className="previewLabel">Total:</span>
                        <span className="previewText">
                          $
                          {invoiceInfo.total % 1 === 0
                            ? invoiceInfo.total
                            : invoiceInfo.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="previewNotes">{invoiceInfo.notes}</div>
                  </div>
                </div>
                <div className="">
                  <button className="" onClick={SaveAsPDFHandler}>
                    <span>Download</span>
                  </button>
                  <button onClick={addNextInvoiceHandler} className="">
                    <span>Next</span>
                  </button>
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
