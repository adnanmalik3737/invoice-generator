import React from "react";
import InvoiceField from "./InvoiceField";

const InvoiceItem = ({
  id,
  name,
  quantity,
  price,
  itax,
  itemId,
  amount,
  onDeleteItem,
  onEdtiItem,
}) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  function ItemAmount(price, itax, quantity) {
    if (itax === null) {
      itax = 0;
    }
    const taxcalculated = (parseFloat(itax) * parseFloat(price)).toFixed(2);
    const taxPercent = taxcalculated / 100;
    const TaxPrice = parseFloat(price) + parseFloat(taxPercent);
    var ItemAmount = (parseFloat(TaxPrice) * parseFloat(quantity)).toFixed(2);

    if (ItemAmount > 0) {
      return ItemAmount;
    } else {
      return (ItemAmount = 0);
    }

    // return tax * price;
  }

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
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
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
      <td className="inputTax">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: "number",
            min: "0",
            step: "0.01",
            name: "itax",
            id: id,
            value: itax,
          }}
        />
      </td>
      <td className="inputQty">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: "number",
            min: "1",
            name: "quantity",
            id: id,
            value: quantity,
          }}
        />
      </td>

      <td className="inputAmount">
        {/* {(parseFloat(price) * parseInt(quantity)).toFixed(2)} Last Functional */}
        {ItemAmount(price, itax, quantity)}
      </td>
    </tr>
  );
};

export default InvoiceItem;
