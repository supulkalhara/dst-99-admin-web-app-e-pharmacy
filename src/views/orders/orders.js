import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderBtn from "../../components/buttons/headerBtn";
import { getStatus, changeState,getDate } from "../../firebase/firebase";
import "./orders.css";

export function OrdersList(customers) {
  var valueS;
  let [allcustomers, setAllcustomers] = useState([]);
  let [customerr, setCustomerr] = useState([]);
  var selection = document.getElementById("select_status");

  useEffect(() => {
    setAllcustomers(customers.customers);
  });

  function onchange(event) {
    valueS = selection.value;

    if (valueS == "0") {
      setCustomerr(allcustomers.all);
    } else if (valueS == "1") {
      setCustomerr(allcustomers.Processing);
    } else if (valueS == "2") {
      setCustomerr(allcustomers.Verified);
    } else if (valueS == "3") {
      setCustomerr(allcustomers.Declined);
    } else if (valueS == "4") {
      setCustomerr(allcustomers.Delivered);
    } else if (valueS == "5") {
      setCustomerr(allcustomers.Received);
    } else {
      console.log("ERROR!");
    }
  }

  return (
    <div>
      <select
        className="form-select form-select-lg mb-3"
        aria-label=".form-select-lg example"
        id="select_status"
        onChange={(e) => onchange(e)}
      >
        <option defaultValue>Select the order status</option>
        <option value="0">all</option>
        <option value="1">Processing</option>
        <option value="2">Verified</option>
        <option value="3">Declined</option>
        <option value="4">Delivered</option>
        <option value="5">Received</option>
      </select>

    <div className="orders__container">
      <div className="table-wrapper">
        <table className="fl-table">
          <tbody>
          <tr className="table__header">
            <td >#</td>
            <td >Date</td>
            <td >Title</td>
            <td >Status</td>
            <td >Action</td>
          </tr>
          </tbody>

          {customerr.map((customer) => {
              const Ordernumber = customerr.indexOf(customer) + 1;
              const createdAt = getDate(customer.createdAt);
              const date = createdAt.date;
              const time = createdAt.time;
              return(
            <tbody key={Ordernumber}>
            <tr className="table__data" >
                <td>{Ordernumber}</td>
                <td>{date}</td>
                <td>{customer.title}</td>
                <td>{customer.status}</td>
                <td key={Ordernumber}>
                <Link
                    to={`orderview/${Ordernumber}`}
                    state={{ customerObject: customer }}
                >
                    <HeaderBtn key={Ordernumber} name="View" />
                </Link>
                </td>
            </tr>
            </tbody>
              );
          })}
        </table>
      </div>
    </div>
    </div>
  );
}
