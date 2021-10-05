import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import url from "../Services/axois";
import refreshToken from "../Services/auth";
import { Link } from "react-router-dom";

function ChangePassword() {
  const [data, setData] = useState([]);
  const [passwordCntrl1, setpasswordCntrl1] = useState(true);
  const [passwordCntrl2, setpasswordCntrl2] = useState(true);
  const [passwordCntrl3, setpasswordCntrl3] = useState(true);
  const token = localStorage.getItem("auth_pass");
  function getUserData() {
    axios
      .get(`${url}/api/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        }
        if (error.response.data.code === "403") {
          refreshToken();
        }
      });
  }
  const initialValuesPassword = {
    old_password: "",
    new_password: "",
    new_password1: "",
  };
  const changePassword = (values, onSubmitProps) => {
    axios
      .post(`${url}/api/settings/set_info/`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          onSubmitProps.resetForm();
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
        }
      })
      .catch((error) => {
        if (error.response.data.code === 400) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        }
        if (error.response.data.code === "403") {
          refreshToken();
        }
      });
  };
  useEffect(() => {
    // refreshToken();
    getUserData();
  }, []);
  return (
    <div className="personalInformation">
      <Navbar />
      <section className="personalInformation__section">
        <div className="container">
          <div className="row mt-3">
            <div className="col-md-3">
              <Link to="../profile">
                <i class="fas fa-arrow-left"></i> Back
              </Link>
            </div>
          </div>
          <div className="row mt-3 d-flex justify-content-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <Formik
                    initialValues={initialValuesPassword}
                    onSubmit={changePassword}
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{
                              position: "relative",
                            }}
                          >
                            <label htmlFor="old_password">
                              Current Password
                            </label>
                            <Field
                              type={passwordCntrl1 ? "password" : "text"}
                              className="form-control"
                              id="old_password"
                              name="old_password"
                              aria-describedby="emailHelp"
                              placeholder="Enter current password"
                            />
                            <i
                              className={
                                passwordCntrl1
                                  ? "fa fa-eye-slash fa-lg"
                                  : "fa fa-eye fa-lg active"
                              }
                              id="change_password_eyeslash1"
                              onClick={() => setpasswordCntrl1(!passwordCntrl1)}
                              style={{
                                fontSize: "15px",
                              }}
                            ></i>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{
                              position: "relative",
                            }}
                          >
                            <label htmlFor="new_password">New Password</label>
                            <Field
                              type={passwordCntrl2 ? "password" : "text"}
                              className="form-control"
                              id="new_password"
                              name="new_password"
                              aria-describedby="emailHelp"
                              placeholder="Enter new password"
                            />
                            <i
                              className={
                                passwordCntrl2
                                  ? "fa fa-eye-slash fa-lg"
                                  : "fa fa-eye fa-lg active"
                              }
                              id="change_password_eyeslash1"
                              onClick={() => setpasswordCntrl2(!passwordCntrl2)}
                              style={{
                                fontSize: "15px",
                              }}
                            ></i>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{
                              position: "relative",
                            }}
                          >
                            <label htmlFor="new_password1">
                              Confirm New Password
                            </label>
                            <Field
                              type={passwordCntrl3 ? "password" : "text"}
                              className="form-control"
                              id="new_password1"
                              name="new_password1"
                              aria-describedby="emailHelp"
                              placeholder="Re-enter new password"
                            />
                            <i
                              className={
                                passwordCntrl3
                                  ? "fa fa-eye-slash fa-lg"
                                  : "fa fa-eye fa-lg active"
                              }
                              id="change_password_eyeslash1"
                              onClick={() => setpasswordCntrl3(!passwordCntrl3)}
                              style={{
                                fontSize: "15px",
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 justify-content-center">
                        <div className="col-md-5">
                          <button className="btn btn__save">SAVE</button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangePassword;
