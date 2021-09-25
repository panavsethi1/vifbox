import React from "react";
import logo from "../logo.png";
import "./PreLogin.css";
import { Link, useHistory } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import url from "../Services/axois";
import axios from "axios";
import Swal from "sweetalert2";

function ForgetPassword() {
  const history = useHistory();
  const initialValues = {
    email: "",
  };
  const token = localStorage.getItem("auth_pass");

  const forgetPassword = (values) => {
    axios
      .post(`${url}/api/password/reset/`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          history.push("/sent-forget-password");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong !!",
          });
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e,
        });
      });
  };

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
      <section className="main__preLogin__section mt-5 pt-5">
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
              <Formik initialValues={initialValues} onSubmit={forgetPassword}>
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <button
                        className="btn preLogin__btn__outline mt-5"
                        type="button"
                      >
                        <Link to="/" className="text-dark">BACK</Link>
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn preLogin__btn mt-5" type="submit">
                        SEND
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgetPassword;
