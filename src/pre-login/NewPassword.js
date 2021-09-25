import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../logo.png";
import url from "../Services/axois";
import "./PreLogin.css";

function NewPassword() {
  const history = useHistory();
  const [passwordCntrl1, setpasswordCntrl1] = useState(true);
  const [passwordCntrl2, setpasswordCntrl2] = useState(true);
  const initialValues = {
    new_pass: "",
    confirm_new_pass: "",
  };
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");

  const newPassword = (values, onSubmitProps) => {
    axios
      .post(`${url}/api/password/reset/confirm/?token=${token}`, values)
      .then((res) => {
        if (res.status === 200) {
          onSubmitProps.resetForm();
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          history.push("/");
        }
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        }
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
              <Formik initialValues={initialValues} onSubmit={newPassword}>
                <Form>
                  <div className="form-group" style={{position:"relative"}}>
                    <label htmlFor="new_pass">New Password</label>
                    <Field
                     type={passwordCntrl1 ? "password" : "text"}
                      className="form-control"
                      id="new_pass"
                      name="new_pass"
                      aria-describedby="emailHelp"
                      placeholder="Enter new password"
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
                  <div className="form-group mt-4" style={{position:"relative"}}>
                    <label htmlFor="confirm_new_pass">
                      Confirm New Password
                    </label>
                    <Field
                     type={passwordCntrl2 ? "password" : "text"}
                      className="form-control"
                      id="confirm_new_pass"
                      name="confirm_new_pass"
                      aria-describedby="emailHelp"
                      placeholder="Re-Enter password"
                    />
                     <i
                      className={
                        passwordCntrl2
                          ? "fa fa-eye-slash fa-lg"
                          : "fa fa-eye fa-lg active"
                      }
                      id="change_password_eyeslash1"
                      onClick={() => setpasswordCntrl2(!passwordCntrl2)}
                      style={{ fontSize: "15px" }}
                    ></i>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <button className="btn preLogin__btn__outline mt-5">
                        BACK
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn preLogin__btn mt-5">SUBMIT</button>
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

export default NewPassword;
