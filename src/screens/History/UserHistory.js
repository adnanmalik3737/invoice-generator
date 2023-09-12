import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserHistory.css";
import historysvg from "../../img/historysvg.svg";
import ActionDots from "../../img/ActionDots.svg";
import NextIcon from "../../img/NextIcon.svg";
import previousIcon from "../../img/previousIcon.svg";
import crossIcon from "../../img/crossIcon.svg";
import InvoiceModel from "../InvoiceModel/InvoiceModel.js";

const History = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const startRange = currentPage * rowsPerPage + 1;
  const endRange = Math.min((currentPage + 1) * rowsPerPage, invoices.length);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/user/invoice`);
        if (response.data.code === 200) {
          setInvoices(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const currentInvoices = invoices.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Event Based Handler
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setOpenDropdown(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdownBtn = (invoiceId) => {
    setOpenInvoiceId((prevInvoiceId) =>
      prevInvoiceId !== invoiceId ? invoiceId : null
    );
  };
  const [openInvoiceId, setOpenInvoiceId] = useState(null);

  const [notification, setNotification] = useState(null);

  const deleteInvoice = async (invoiceId) => {
    setLoading(true);
    console.log("Delete action started");
    try {
      const response = await axios.delete(
        `${baseUrl}/api/invoice/delete/${invoiceId}`
      );

      if (response.data.code === 200) {
        console.log(response.data.message);
        setNotification(`Invoice ${invoiceId} Deleted`);
        // Update the invoices state to remove the deleted invoice
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice.InvoiceId !== invoiceId)
        );
        setTimeout(() => setNotification(null), 3000);
      } else {
        console.error("Failed to delete invoice:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const imageFileURL = "http://localhost:5000/";

  const handleViewClick = (invoice) => {
    setCurrentInvoice(invoice);
    setIsOpen(true);
  };

  // if (!isLoggedIn) {
  //   return <p>Please login to view your history.</p>;
  // }

  if (loading) {
    return (
      <div className="historyPage">
        {/* <div className="loader">Loading...</div> */}
        <div className="loading">
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
          <div className="loading__dot"></div>
        </div>
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="historyPage">
        <div className="noHistory">
          <img src={historysvg} />
          <p>
            There’s no any history yet! <br /> <br /> If you want to “Create
            Invoice” <Link to="/create-invoice">click here</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="historyPage">
      <h1>History</h1>
      {notification && <div className="notification">{notification}</div>}
      <div className="invoice-table" ref={dropdownRef}>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Sr #</th>
              <th>Invoice No</th>
              <th>Invoice Title</th>
              <th>Date & Time</th>
              <th>Actions</th>
              {/* <th>Logo</th>
              <th>Stamp</th>
              <th>Signature</th> */}
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice, index) => (
              <tr key={invoice.InvoiceId}>
                <td>{currentPage * rowsPerPage + index + 1}</td>
                <td>#{invoice.InvoiceId}</td>
                <td>{"Invoice Title"}</td>
                <td>
                  {new Date(invoice.invoiceDate).toLocaleDateString()} ,{" "}
                  {new Date(invoice.createdAt).toLocaleTimeString()}
                </td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => toggleDropdownBtn(invoice.InvoiceId)}
                  >
                    {openInvoiceId === invoice.InvoiceId ? (
                      <img src={crossIcon} />
                    ) : (
                      <img src={ActionDots} width={24} />
                    )}
                  </button>

                  {openInvoiceId === invoice.InvoiceId && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleViewClick(invoice)}>
                        View
                      </button>
                      {isOpen && (
                        <InvoiceModel
                          invoice={currentInvoice}
                          logo={currentInvoice.logo}
                          stamp={currentInvoice.stamp}
                          signature={currentInvoice.signature}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          onClose={() => setIsOpen(false)}
                        />
                      )}

                      <button>Edit</button>
                      <button onClick={() => deleteInvoice(invoice.InvoiceId)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td>
                {/* <td>
                  {invoice.logo && (
                    <img
                      src={`${imageFileURL}${invoice.logo.replace(/\\/g, "/")}`}
                      alt="Logo"
                      width="50"
                    />
                  )}
                </td>
                <td>
                  {invoice.stamp && (
                    <img
                      src={`${imageFileURL}${invoice.stamp.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="Stamp"
                      width="50"
                    />
                  )}
                </td>
                <td>
                  {invoice.signature && (
                    <img
                      src={`${imageFileURL}${invoice.signature.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="Signature"
                      width="50"
                    />
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginationControls">
        <div className="showEntries">
          <span>Show :</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(+e.target.value)}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="showPages">
          <span className="current-entries">
            ({startRange}-{endRange} of {invoices.length} )
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 0}
          >
            <img src={previousIcon} />
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentInvoices.length < rowsPerPage}
          >
            <img src={NextIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
