import React from "react";
import logo from "../logo.png";
import "./PreLogin.css";
import gitHub from "../Assets/img/gitHub.png";
import { Link } from "react-router-dom";

function ForgetPassword() {
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
      <section className="main__preLogin__section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center color__primary">Reset Password</h1>
              <p className="text-center">
                Enter your email address & we'll send you a link to reset your
                password.
              </p>
            </div>
          </div>
          <div className="row mt-5 pt-md-5 d-flex justify-content-center">
            <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label for="username">Email email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <button className="btn preLogin__btn__outline mt-5">
                      BACK
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn preLogin__btn mt-5">
                      <Link to="/sent-forget-password" className="text-light">
                        SEND
                      </Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
