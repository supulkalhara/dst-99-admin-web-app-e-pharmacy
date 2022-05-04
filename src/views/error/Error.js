import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Error.css";

export function Error() {
  const navigate = useNavigate();
  useEffect ( () => {
    setTimeout( () => {
      navigate("/home");
    } , 5000);
  } , [navigate] )   // timeout is depend on [navigate]
  console.log("URL not found");
  return (
    <div className="error">
      <h3>URL not found</h3>
    </div>
  );
}
