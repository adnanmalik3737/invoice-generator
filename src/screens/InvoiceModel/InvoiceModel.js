import React, { Fragment } from "react";
import "./Model.css";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

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

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="modelView" onClose={closeModal}>
        <div className="innerModel">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="innerDialog" />
          </Transition.Child>

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
              <div className="boxA" id="print">
                <h1 className="modelHeading">INVOICE</h1>
                <div className="mt-6">
                  <div className="mb-4 grid grid-cols-2">
                    <span className="font-bold">Invoice Number:</span>
                    <span>{invoiceInfo.invoiceNumber}</span>
                    {/* <span className="font-bold">Cashier:</span>
                    <span>{invoiceInfo.cashierName}</span>
                    <span className="font-bold">Customer:</span>
                    <span>{invoiceInfo.customerName}</span> */}
                  </div>

                  <table className="modelTable">
                    <thead>
                      <tr className="tableHead">
                        <th>ITEM</th>
                        <th className="text-center">QTY</th>
                        <th className="text-right">PRICE</th>
                        <th className="text-right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full">{item.name}</td>
                          <td className="min-w-[50px] text-center">
                            {item.qty}
                          </td>
                          <td className="min-w-[80px] text-right">
                            ${Number(item.price).toFixed(2)}
                          </td>
                          <td className="min-w-[90px] text-right">
                            ${Number(item.price * item.qty).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex flex-col items-end space-y-2">
                    <div className="flex w-full justify-between border-t border-black/10 pt-2">
                      <span className="font-bold">Subtotal:</span>
                      <span>${invoiceInfo.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between">
                      <span className="font-bold">Discount:</span>
                      <span>${invoiceInfo.discountRate.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between">
                      <span className="font-bold">Tax:</span>
                      <span>${invoiceInfo.taxRate.toFixed(2)}</span>
                    </div>
                    <div className="flex w-full justify-between border-t border-black/10 py-2">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">
                        $
                        {invoiceInfo.total % 1 === 0
                          ? invoiceInfo.total
                          : invoiceInfo.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="#333"
                  >
                    <g clip-path="url(#clip0_234_96328)">
                      <path
                        d="M2.43945 0.566406V15.5078H13.5576V4.86719H9.4209V0.566406H2.43945ZM3.37988 1.50391H8.48047V5.80469H12.6201V14.5703H3.37988V1.50391Z"
                        fill="#333333"
                      />
                      <path
                        d="M10.4316 3.69238H13.5605L10.4316 0.566406V3.69238Z"
                        fill="#333333"
                      />
                      <path
                        d="M7.58984 7.34277H8.52734V12.6367H7.58984V7.34277Z"
                        fill="#333333"
                      />
                      <path
                        d="M8.03809 13.7529L5.39844 11.3975L6.02246 10.6973L8.04395 12.502L10.0947 10.6943L10.7158 11.3975L8.03809 13.7529Z"
                        fill="#333333"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_234_96328">
                        <rect
                          width="15"
                          height="15"
                          fill="white"
                          transform="translate(0.5 0.537109)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={addNextInvoiceHandler}
                  className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  <span>Next</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModel;
