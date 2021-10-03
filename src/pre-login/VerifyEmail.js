import axios from "axios";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../logo.png";
import url from "../Services/axois";
import "./PreLogin.css";

function VerifyEmail() {
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
  const history = useHistory();

  const emailVerify = () => {
    axios
      .get(`${url}/api/email-verify/?token=${token}`)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
        }
      })
      .catch((error) => {
        if (error.response.data) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        }
      });
  };

  useEffect(() => {
    emailVerify();
  }, []);

  return (
    <div className="preLogin">
      <section className="navbar__section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 offset-1 mt-3">
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
              <h1 className="text-center color__primary">Verification Email</h1>
              <p className="text-center">
                Your email verification is successfully completed
              </p>
            </div>
          </div>
          <div className="row mt-5 pt-md-5 d-flex justify-content-center">
            <div className="col-md-4">
              <button className="btn preLogin__btn mt-5 text-light">
                <Link to="/" className="text-light">
                  OK
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerifyEmail;
