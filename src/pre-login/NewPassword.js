import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.png";
import "./PreLogin.css";

function NewPassword() {
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
                Select you new password
              </h1>
            </div>
          </div>
          <div className="row mt-5 pt-md-5 d-flex justify-content-center">
            <div className="col-md-6">
              <form>
                <div className="form-group">
                  <label for="newPassword">New Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="newPassword"
                    aria-describedby="emailHelp"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="form-group mt-4">
                  <label for="confirmPassword">Confirm New Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="confirmPassword"
                    aria-describedby="emailHelp"
                    placeholder="Re-Enter password"
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
                      <Link to="/" className="text-light">
                        Done
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

export default NewPassword;
