import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import url from "../Services/axois";
import refreshToken from "../Services/auth";
import { Link } from "react-router-dom";

function CompanyInformation() {
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

  const initialValuesCompany = {
    company_email: data.company_email,
    company_name: data.company_name,
  };

  const companyUpdate = (values, onSubmitProps) => {
    axios
      .put(`${url}/api/profile/set_company/`, values, {
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
  useEffect(() => {
    // refreshToken();
    getUserData();
  }, []);
  return (
    <div className="companyInformation">
      <Navbar />
      <section className="companyInformation__section">
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
                    initialValues={initialValuesCompany}
                    onSubmit={companyUpdate}
                    enableReinitialize
                  >
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="company_name">Company Name</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="company_name"
                              name="company_name"
                              aria-describedby="emailHelp"
                              placeholder="Enter Company Name"
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="company_email">Company Email</label>
                            <Field
                              type="text"
                              className="form-control"
                              id="company_email"
                              name="company_email"
                              aria-describedby="emailHelp"
                              placeholder="Enter company email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4 d-flex justify-content-center">
                        <div className="col-4">
                          <button className="btn btn__close">
                            <Link to="../profile" className="text-dark">
                              CANCEL
                            </Link>
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

export default CompanyInformation;
