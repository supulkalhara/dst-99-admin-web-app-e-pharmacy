import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  getDoc,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../App";
import { async } from "@firebase/util";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIafOMdor2BSwSVQzK3FyTM9zc_yL_yB0",
  authDomain: "e-pharmacy-dst99.firebaseapp.com",
  projectId: "e-pharmacy-dst99",
  storageBucket: "e-pharmacy-dst99.appspot.com",
  messagingSenderId: "139963413462",
  appId: "1:139963413462:web:705856164c8ce363096a77",
  measurementId: "G-4N52HCT1RD"
};


//init firebase app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "customers");
export { db };

//------------------------------------functions e-pharmacy ---------------------------------------------------

//---------------------------------------------admin functions--------------------------------------------------

export function adminLogin(email, pass, setErr, navigate) {
  const email1 = "admin1@ep.com";
  const email2 = "admin2@ep.com";
  const hashedpass = -654363910;
  const LOCAL_STORAGE_KEY = "userlog";
  var errMsg = "";
  String.prototype.hashCode = function () {
    var hash = 0,
      i,
      chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
  const typedPass = pass.hashCode();

  if (email === email1 || email === email2) {
    if (Number(hashedpass) === Number(typedPass)) {
      const user = { loggedIn: true}
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      navigate(`/home`);
    } else {
      errMsg = "Your password is wrong";
    }
  } else {
    errMsg = "Your email is not an admin's email";
  }
  setErr(errMsg);
}

export function LogoutUser(){
  const LOCAL_STORAGE_KEY = "userlog";
  const auth = getAuth();
  signOut(auth)
  .then(() => {
    const user = { loggedIn: false }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    window.location.href = '/';
  })
  .catch(err => {
    console.log(err.message)
  })
}

export async function getCustomerdetails(setCustomers) {
  const cus_det = {
    Processing: [],
    Verified: [],
    Declined: [],
    Delivered: [],
    Received: [],
    all: [],
  };

  try {
    const querySnapshot = await getDocs(collection(db, "customers"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      var Id = doc.id;
      getCustomerQuery(Id, cus_det);
    });

    setCustomers(cus_det);
    return cus_det;
  } catch {
    console.log("failed to read");
  }
}

async function getCustomerQuery(Id, cus_det) {
  const customer_query = await getDocs(
    collection(db, "customers/" + Id + "/orderDetails")
  );

  customer_query.forEach((cus_doc) => {
    var data = cus_doc.data();
    if (!cus_det.all.includes(data)) {
      cus_det.all.push(data);
    }
    if (data.status === "Processing") {
      if (!cus_det.Processing.includes(data)) {
        cus_det.Processing.push(data);
      }
    } else if (data.status === "Verified") {
      if (!cus_det.Verified.includes(data)) {
        cus_det.Verified.push(data);
      }
    } else if (data.status === "Declined") {
      if (!cus_det.Declined.includes(data)) {
        cus_det.Declined.push(data);
      }
    } else if (data.status === "Delivered") {
      if (!cus_det.Delivered.includes(data)) {
        cus_det.Delivered.push(data);
      }
    } else if (data.status === "Received") {
      if (!cus_det.Received.includes(data)) {
        cus_det.Received.push(data);
      }
    }
  });
}

export async function getStatus(Id, OrderId, setStatus) {
  try {
    const docRef = doc(db, "customers/" + Id + "/orderDetails/" + OrderId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    setStatus(docData.status);
  } catch {
    console.log("failed to get orderID");
  }
}

export async function getCustomerDetails(Id,setCusDet) {
  try {
    const docRef = doc(db, "customers/" + Id);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    const name = docData.name;
    const contact = docData.contact;
    const CusDet = {name:name , contact:contact};
    setCusDet(CusDet);
  } catch {
    console.log("failed to get orderID");
  }
}


export async function changeState(userID, orderID, newState) {
  try {
    const StrorderId = orderID.toString();
    const cusRef = doc(db, "customers/" + userID + "/orderDetails", StrorderId);
    await setDoc(cusRef, { status: newState }, { merge: true });
  } catch {
    console.log("State Change Failed!");
  }
}

export function getDate(time){
  
  const fireBaseTime = new Date(
    time.seconds * 1000 + time.nanoseconds / 1000000,
  );
  const date = fireBaseTime.toDateString();
  const atTime = fireBaseTime.toLocaleTimeString();
  return{
    'date': date,
    'time': atTime
  }

}

export async function setPriceDB(userID, orderID, price) {
  try {
    const cusRef = doc(db, "customers/" + userID + "/orderDetails", orderID);
    await setDoc(cusRef, { price: price }, { merge: true });
  } catch {
    console.log("Price Change Failed!");
  }
}
