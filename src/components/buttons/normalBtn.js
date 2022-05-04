import React from "react";
import "./normalBtn.css";

function NormalBtn({name,color}) {
  return (
    <div className="normalBtn">
      <button style={{backgroundColor:color}}>{name}</button>
    </div>
  );
}

export default NormalBtn;
