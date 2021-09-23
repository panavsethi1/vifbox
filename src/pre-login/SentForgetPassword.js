import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import "./PreLogin.css";

function SentForgetPassword() {
  return (
    <div className="preLogin">
      <section className="navbar__section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mt-3">
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  className="img-fluid"
                  style={{ width: "160px" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="main__preLogin__section mt-5 pt-md-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center color__primary">
                Sent! Check Your Email
              </h1>
              <p className="text-center">
                Head over to your mailbox to get your reset link and create your
                brand new password.
              </p>
            </div>
          </div>
          <div className="row mt-5 pt-md-5 d-flex justify-content-center">
            <div className="col-md-4">
              <button className="btn preLogin__btn mt-5 text-light">
                <Link to="/" className="text-light">
                  DONE
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SentForgetPassword;
