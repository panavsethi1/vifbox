import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import url from "../Services/axois";
import refreshToken from "../Services/auth";
import { Link } from "react-router-dom";
import tick from "../Assets/img/tick.png";
import cross from "../Assets/img/cross.png";
import exclamation from "../Assets/img/exclamation.png";

function AccountSecurity() {
  const [data, setData] = useState([]);
  const [settingData, setSettingData] = useState([]);
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
  useEffect(() => {
    // refreshToken();
    getUserData();
    setting();
  }, []);
  const setting = () => {
    axios
      .get(`${url}/api/settings/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setSettingData(res.data.data);
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
                  <div className="row mt-5">
                    <div className="col-2 d-flex justify-content-center align-items-start">
                      <img
                        src={settingData.is_verified === true ? tick : cross}
                        alt=""
                        className="img-fluid"
                        style={{ width: "25px" }}
                      />
                    </div>
                    <div className="col-10">
                      <h6>CONFIRM EMAIL</h6>
                      <small>
                        {settingData.is_verified === true
                          ? "Email is verified"
                          : "Your email is not verified"}
                      </small>
                      <p
                        className="mt-2 font-weight-bold"
                        style={{
                          cursor: "pointer",
                          color: "#26237b",
                        }}
                        onClick={() => {
                          axios
                            .get(`${url}/api/email-verify-resend/`, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                            .then((res) => {
                              if (res.status === 200) {
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
                                Swal.fire({
                                  icon: "error",
                                  text: error.response.data.message,
                                });
                                refreshToken();
                              }
                            });
                        }}
                      >
                        {settingData.is_verified === true ? "" : "Resend Email"}
                      </p>
                      {/* <button onClick={resendEmail()}>
                              Resend Email
                            </button> */}
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-2">
                      <img
                        src={exclamation}
                        alt=""
                        className="img-fluid d-block m-auto" 
                        style={{ width: "25px" }}
                      />
                    </div>
                    <div className="col-10">
                      <h6>2 STEP VERIFICATION</h6>
                      <small>
                        Protect your Vifbox account with both your password & a
                        phone code.
                      </small>
                      <p
                        className="mt-2 font-weight-bold"
                        style={{
                          cursor: "pointer",
                          color: "#26237b",
                        }}
                      >
                        Enable
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AccountSecurity;
