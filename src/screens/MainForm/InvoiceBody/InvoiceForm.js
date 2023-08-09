import React, { useState } from "react";
import InvoiceItem from "./InvoiceItem";
import { uid } from "uid";
// import incrementString from "../../../helpers/incrementString";

const InvoiceForm = () => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [discount, setDiscount] = useState('');
  // const [tax, setTax] = useState('');
  // const [invoiceNumber, setInvoiceNumber] = useState(1);
  // const [cashierName, setCashierName] = useState('');
  // const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "0.00",
    },
  ]);

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

  return (
    <>
      <div className="itemsTable">
        <table className="tableArea">
          <thead>
            <tr className="TableHead">
              <th className="text-center">ACTION</th>
              <th className="text-center">DESCRIPTION</th>
              <th className="text-center">RATE</th>
              <th className="text-center">QTY</th>
              <th className="text-center">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <InvoiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                qty={item.qty}
                price={item.price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={edtiItemHandler}
              />
            ))}
          </tbody>
        </table>
        <button className="" type="button" onClick={addItemHandler}>
          Add Item
        </button>
      </div>
    </>
  );
};

export default InvoiceForm;
