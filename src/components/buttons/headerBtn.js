import React from "react";
import "./headerBtn.css";

function HeaderBtn({ name }) {
  return (
    <div className="headerBtn">
      <button>{name}</button>
    </div>
  );
}

export default HeaderBtn;
