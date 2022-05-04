import React from "react";
import { Link } from "react-router-dom";
import HeaderBtn from "../components/buttons/headerBtn";
import logo1 from "../assets/images/e-pharmacy.svg";
import { LogoutUser } from "../firebase/firebase";
import "./header.css";

function logout () {
  LogoutUser();
}

function Header() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#"><img src={logo1} width="200" height="40" alt=""/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar2" aria-controls="navbar2" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbar2">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div className="d-flex">
          <button className="btn btn-outline-primary my" onClick={logout} >Logout</button>
        </div>
    </div>
  </nav>
  );

}

export default Header;