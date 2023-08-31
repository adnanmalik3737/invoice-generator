import React from "react";
import InvoiceField from "./InvoiceField";

const InvoiceItem = ({
  id,
  name,
  qty,
  price,
  itax,
  amount,
  onDeleteItem,
  onEdtiItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  function calculateTotalPrice(price, tax, qty) {
    const taxcalculated = tax * price;
    console.log(taxcalculated);

    // return ((price + { taxcalculated }) * qty).toFixed(2);
    return tax * price;
  }

  const calculateTotalAmount = () => {
    const totalPrice =
      parseFloat(price) + (parseFloat(itax) * parseFloat(price)) / 100;
    return (totalPrice * parseInt(qty)).toFixed(2);
  };

  return (
    <tr>
      <td className="inputAction">
        <button className="invoiceDeleteIcon" onClick={deleteItemHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="white"
          >
            <path
              d="M1.51855 9.55225L9.51855 1.55225M1.51855 1.55225L9.51855 9.55225"
              stroke="#009BD6"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </td>
      <td className="inputDesc">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: "Item name",
            type: "text",
            name: "name",
            id: id,
            value: name,
          }}
        />
      </td>
      <td className="inputRate">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: "",
            type: "number",
            min: "0.01",
            step: "0.01",
            name: "price",
            id: id,
            value: price,
          }}
        />
      </td>
      {/* <td className="inputTax">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: "number",
            min: "0.01",
            step: "0.01",
            name: "itax",
            id: id,
            value: itax,
          }}
        />
      </td> */}
      <td className="inputQty">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: "number",
            min: "1",
            name: "qty",
            id: id,
            value: qty,
          }}
        />
      </td>

      <td className="inputAmount">
        {/* Calculate and display the total price */}

        {/* {(
          ((parseFloat(price) +
            parseFloat(parseFloat(itax) * parseFloat(price))) /
            100) *
          parseInt(qty)
        ).toFixed(2)} */}

        {(parseFloat(price) * parseInt(qty)).toFixed(2)}

        {/* {calculateTotalAmount()} */}
      </td>
    </tr>
  );
};

export default InvoiceItem;
