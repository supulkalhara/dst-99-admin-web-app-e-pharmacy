import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import "./subHeader.css";
import backArrow from "../../assets/icons/backArrow.svg";
import epharmacyLogo from "../../assets/images/e-pharmacy.svg";

function back(parentPath) {
  if(parentPath){
    window.location.href = parentPath;
  }else{
    window.location.href = "/";
  }
};

function isPositiveInteger(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}

function SubHeader() {
  
  const location = useLocation();
  const arr = location.pathname.split('/');
  var currPage = arr[arr.length - 1];
  if(isPositiveInteger(currPage)){
    var currPage = arr[arr.length - 2];
    arr.pop()
  }
  const parentPath = arr
      .filter((item) => {
          return item !== currPage;
      })
      .join('/');

  return (
    <div className="subHeader">
      <img onClick={() => back(parentPath)} className="back" src={backArrow} alt="" />

      <img className="epharmacyLogo" src={epharmacyLogo} alt="" />
    </div>
  );
}

export default SubHeader;
