import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import url from "../Services/axois";
import refreshToken from "../Services/auth";
import { Link } from "react-router-dom";

function PersonalInformation() {
  const [data, setData] = useState([]);
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
      .put(`${url}/api/profile/set_info/`, values, {
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
                    initialValues={initialValues}
                    onSubmit={personalInfo}
                    enableReinitialize
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                        <div className="col-md-6">
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
                      <div className="row mt-4 d-flex justify-content-center">
                        <div className="col-4">
                          <button className="btn btn__close">
                            <Link to="../profile" className="text-dark">CANCEL</Link>
                          </button>
                        </div>
                        <div className="col-4">
                          <button className="btn btn__save" type="submit">
                            UPDATE
                          </button>
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

export default PersonalInformation;
