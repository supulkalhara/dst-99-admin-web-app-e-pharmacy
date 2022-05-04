import React, { useContext, useEffect, useState } from "react";
import { collection, query,onSnapshot } from "firebase/firestore";
import {getCustomerdetails} from "../../firebase/firebase";
import { OrdersList } from "../orders/orders";
import Header from "../../navigation/header";
import { Link } from "react-router-dom";
import "./HomeView.css";

export function HomeView() {

  const [customers,setCustomers] =  useState("");
  useEffect(() => {
    getCustomerdetails(setCustomers);
  },[]); 


  return (

    <div>
      <Header />
      <div className="viewOrder">
        <div className="">
        <h3>Orders</h3>
        <div className="orders__container">
          <OrdersList  customers = {customers}/> 
        </div>
        </div>
      </div>
    </div>
    
  );
}
