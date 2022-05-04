import React, { useState, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import LadyImg from "../../assets/images/ladyImg.svg";
import msgIcon from "../../assets/icons/msg.svg";
import passwordIcon from "../../assets/icons/password.svg";
import { adminLogin } from "../../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
//import { UserContext } from "../../App";


export function Login() {

  //your password is " ph1999: "
  //your email is " admin1@ep.com  "
  //your email is " admin2@ep.com  "
  const { user, setUser } = "" //useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErr] = useState("");


  const login = (e) => {
    e.preventDefault();
    adminLogin(email, password, setErr, navigate);

  };
  return (
    <div className="login">
      <div className="welcome__form">
        <h3>Admin login</h3>

        <div className="login__bottom">
          {/* <img src={LadyImg} alt="" /> */}

          <div className="login__form">
          
            <form action="">
              <div className="error">
                <p>{errmsg}</p>
              </div>
              <div className="input">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="input">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <button onClick={login} className="login__button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
