import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import tick from "../Assets/img/tick.png";
import exclamation from "../Assets/img/exclamation.png";
import axios from "axios";
import url from "../Services/axois";
import Swal from "sweetalert2";
import refresh__token__obj from "../Services/auth";
import refreshToken from "../Services/auth";

function Profile() {
  const [data, setData] = useState([]);
  const [passwordCntrl1, setpasswordCntrl1] = useState(true);
  const [passwordCntrl2, setpasswordCntrl2] = useState(true);
  const [passwordCntrl3, setpasswordCntrl3] = useState(true);
  const token = localStorage.getItem("auth_pass");

  const getUserData = () => {
    axios
      .get(`${url}/api/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.data);
        } else if (res.status === 403) {
          refreshToken();
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
  const initialValues = {
    email: data.email,
    name: data.name,
    username: data.username,
    phone: data.phone_number,
  };
  useEffect(() => {
    // refreshToken();
    getUserData();
  }, []);

  const personalInfo = (values) => {
    axios
      .post(`${url}/api/profile/set_info/`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          getUserData();
        }
      });
  };
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
      .catch((e) => {});
  };

  return (
    <div className="profile">
      <Navbar />

      <section className="profile__section mt-5">
        <div className="container-fluid">
          <div className="row pb-5 flex-wrap">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>PERSONAL INFORMATION</h5>

                  <Formik
                    initialValues={initialValues}
                    onSubmit={personalInfo}
                    enableReinitialize
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              aria-describedby="emailHelp"
                              placeholder="Enter name"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="email"
                              name="email"
                              aria-describedby="emailHelp"
                              placeholder="Enter email"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="username"
                              name="username"
                              aria-describedby="emailHelp"
                              placeholder="Enter username"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="phone"
                              name="phone"
                              aria-describedby="emailHelp"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 justify-content-center">
                        {/* <div className="col-md-5"> */}
                        {/* <button className="btn btn__close">CLOSE</button> */}
                        {/* </div> */}
                        <div className="col-md-5">
                          <button className="btn btn__save">UPDATE</button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>CHANGE PASSWORD</h5>

                  <Formik
                    initialValues={initialValuesPassword}
                    onSubmit={changePassword}
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{ position: "relative" }}
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
                              placeholder="Enter name"
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
                        </div>
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{ position: "relative" }}
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
                              style={{ fontSize: "15px" }}
                            ></i>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div
                            className="form-group"
                            style={{ position: "relative" }}
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
                              style={{ fontSize: "15px" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 justify-content-center">
                        {/* <div className="col-md-5">
                          <button className="btn btn__close">CLOSE</button>
                        </div> */}
                        <div className="col-md-5">
                          <button className="btn btn__save">SAVE</button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5>COMPANY INFORMATION</h5>

                  <Formik>
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="name">Company Name</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="name"
                              aria-describedby="emailHelp"
                              placeholder="Enter name"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">Company Email</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="email"
                              aria-describedby="emailHelp"
                              placeholder="Enter email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 justify-content-center">
                        <div className="col-md-5">
                          <button className="btn btn__close">CLOSE</button>
                        </div>
                        <div className="col-md-5">
                          <button className="btn btn__save">SAVE</button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4 mt-5">
              <div className="card">
                <div className="card-body">
                  <h5>ACCOUNT SECURITY</h5>

                  <div className="row mt-5">
                    <div className="col-2">
                      <img src={tick} alt="" className="img-fluid" />
                    </div>
                    <div className="col-10">
                      <h5>CONFIRM EMAIL</h5>
                      <small>Your email is confirmed</small>
                      <p className="mt-2 font-weight-bold">Change</p>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-2">
                      <img src={exclamation} alt="" className="img-fluid" />
                    </div>
                    <div className="col-10">
                      <h5>2 STEP VERIFICATION</h5>
                      <small>
                        Protect your Vifbox account with both your password & a
                        phone code.
                      </small>
                      <p className="mt-2 font-weight-bold">Enable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4 mt-5">
              <div className="card">
                <div className="card-body">
                  <h5>COMPANY INFORMATION</h5>

                  <Formik>
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="name">Theme</label>
                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option>Dark</option>
                              <option>Light</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">Language</label>
                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option>English</option>
                              <option>French</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 justify-content-center">
                        <div className="col-md-5">
                          <button className="btn btn__close">CLOSE</button>
                        </div>
                        <div className="col-md-5">
                          <button className="btn btn__save">SAVE</button>
                        </div>
                      </div>
                    </Form>
                  </Formik>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
