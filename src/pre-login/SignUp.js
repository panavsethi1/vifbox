import React, { useState } from "react";
import logo from "../logo.png";
import "./PreLogin.css";
import gitHub from "../Assets/img/gitHub.png";
import { Link, useHistory } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import url from "../Services/axois";
import axios from "axios";
import Swal from "sweetalert2";

function SignUp() {
  const history = useHistory();
  const [passwordCntrl1, setpasswordCntrl1] = useState(true);
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };
  const signUp = (values) => {
    axios
      .post(`${url}/api/register/`, values)
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res,
          });
          history.push("/");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res,
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
              <Formik initialValues={initialValues} onSubmit={signUp}>
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="first_name"
                          name="first_name"
                          aria-describedby="emailHelp"
                          placeholder="Enter firstname"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="last_name"
                          name="last_name"
                          aria-describedby="emailHelp"
                          placeholder="Enter lastname"
                          required
                        />
                      </div>
                    </div>
                  </div>
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
                  <div
                    className="form-group mt-4"
                    style={{ position: "relative" }}
                  >
                    <label htmlFor="password">Password</label>
                    <Field
                      type={passwordCntrl1 ? "password" : "text"}
                      className="form-control"
                      id="password"
                      name="password"
                      aria-describedby="emailHelp"
                      placeholder="Enter password"
                      required
                    />
                    <i
                      className={
                        passwordCntrl1
                          ? "fa fa-eye-slash fa-lg"
                          : "fa fa-eye fa-lg active"
                      }
                      id="change_password_eyeslash1"
                      onClick={() => setpasswordCntrl1(!passwordCntrl1)}
                      style={{ fontSize: "15px" }}
                    ></i>
                  </div>
                  <button className="btn preLogin__btn mt-5" type="submit">
                    REGISTER
                  </button>
                  <p className="text-center mt-2" style={{ fontSize: "14px" }}>
                    By signing in, you agree to Vifbox's
                    <span className="color__primary">Terms and Conditions</span>
                    and
                    <span className="color__primary"> Privacy Policy</span>
                  </p>
                </Form>
              </Formik>
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
