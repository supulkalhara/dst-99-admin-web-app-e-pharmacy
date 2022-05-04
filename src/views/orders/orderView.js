import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getStatus, changeState,getDate,getCustomerDetails,setPriceDB} from "../../firebase/firebase";
import SubHeader from "../../components/subHeader/subHeader";
import "./orderView.css";

export function OrderView() {
  const location = useLocation();
  const orderData = location.state.customerObject;
  const Id = orderData.uID;
  var docId = orderData.presID;
  const [disable, setDisable] = useState(false);
  const [disableDeliver, setDisableDeliver] = useState(false);
  const [render,setRender] = useState(false);
  const [status,setStatus] = useState(orderData.status);
  const [Cusdetails,setCusdetails] = useState("");
  const [price, setPrice] = useState("");
  const createdAt = getDate(orderData.createdAt);
  const date = createdAt.date;
  const time = createdAt.time;

  useEffect(() => {
    getCustomerDetails(Id,setCusdetails);
  }, []);

  useEffect(() => {
    getStatus(Id,docId,setStatus);
  }, [render]);

  const changeStatus = (newStatus) => {
    changeState(Id, docId, newStatus);
	if(render){
		setRender(false);
	}else{
		setRender(true);
	}
	
  };

  const declineOrder = () => {
    changeStatus("Declined");
    setDisable(true);
  };
  const acceptOrder = () => {
    if(price){
      changeStatus("Verified");
      setPriceDB(Id, docId, price);
      setDisable(true);
    }else{
      alert("please enter the amount!");
    }

  };
  const sendToDelivery = () => {
    changeStatus("Delivered");
    setDisableDeliver(true);
  };

  useEffect(() => {
    if (status === "Processing") {
      setDisable(false);
    } else {
      setDisable(true);
    }
    if (status === "Verified") {
      setDisableDeliver(false);
    } else {
      setDisableDeliver(true);
    }
  }, [status]);

  return (
    <>
      <SubHeader />
      <div className="viewContainer">
        <h3 className="orderH3">Order Details</h3>

        <div className="viewOrder">
          <div className="order__container">
            <div className="content">
              <h4>
                <strong>Order ID: </strong>
                {docId}
              </h4>
              <p>
                <strong>Order Title: </strong>
                {orderData.title}
              </p>
              <p>
                <strong>Order Date: </strong>
                {date}
              </p>
              <p>
                <strong>At : </strong>
                {time}
              </p>
              <p>
                <strong>Name: </strong>
                {Cusdetails.name}
              </p>
              <p>
                <strong>Contact: </strong>
                {Cusdetails.contact}
              </p>
              <p>
                <strong>Address: </strong>
                {orderData.address}
              </p>
              <p>
                <strong>Status: </strong>
                {status}
              </p>
              
              <form style={{
              display: disable ? "none" : "block"}}>
                <label>
                  Total Price: (LKR)
                  <input type="text" name="price" placeholder="Add total amount here..." value={price} onChange={(e) => {setPrice(e.target.value); }} required />
                </label>
              </form>
              

              <p style={{
              display: disableDeliver ? "none" : "block",}}>
                <strong>Price: </strong>
                {orderData.price}
              </p>

            </div>
          </div>
          <div className="prescription">
            <img src={orderData.prescription} alt="" />
          </div>
          <br></br>
        </div>
        <div className="buttonSection">
          <button
            style={{
              display: disable ? "none" : "block",
              borderStyle: " solid #0094FF",
              color: "#0094FF",
            }}
            className="Decline button"
            onClick={declineOrder}
          >
            Decline Order
          </button>
          <button
            style={{
              display: disableDeliver ? "none" : "block",
              backgroundColor: "#0094FF",
              color: "white",
            }}
            className="deliver button"
            onClick={sendToDelivery}
          >
            Send to delivery
          </button>
          <button
            style={{
              display: disable ? "none" : "block",
              backgroundColor: "#0094FF",
              color: "white",
            }}
            className="Accept button"
            onClick={acceptOrder}
          >
            Accept Order
          </button>
        </div>
      </div>
    </>
  );
}
