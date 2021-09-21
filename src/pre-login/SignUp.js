import React from "react";
import logo from "../logo.png";
import "./PreLogin.css";
import gitHub from "../Assets/img/gitHub.png";
import { Link } from "react-router-dom";

function SignUp() {
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
              <h1 className="text-center color__primary">Sign Up</h1>
              <p className="text-center">
                Already have an account?
                <span className="color__secondary font-weight-bold">
                  <Link to="/" className="color__secondary">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="row mt-5 pt-md-5">
            <div className="col-md-7">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="firstname">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstname"
                        aria-describedby="emailHelp"
                        placeholder="Enter firstname"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label for="lastname">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastname"
                        aria-describedby="emailHelp"
                        placeholder="Enter lastname"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group mt-4">
                  <label for="username">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="username"
                    aria-describedby="emailHelp"
                    placeholder="Enter password"
                  />
                </div>
                <button className="btn preLogin__btn mt-5">REGISTER</button>
                <p className="text-center mt-2" style={{ fontSize: "14px" }}>
                  By signing in, you agree to Vifbox's
                  <span className="color__primary">Terms and Conditions</span>
                  and
                  <span className="color__primary"> Privacy Policy</span>
                </p>
              </form>
            </div>
            <div className="col-md-1">
              <span className="vl"></span>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <img src={gitHub} alt="" className="img-fluid github__img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
