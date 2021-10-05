import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import url from "../Services/axois";
import Swal from "sweetalert2";
import refreshToken from "../Services/auth";
import { Link } from "react-router-dom";
import tick from "../Assets/img/tick.png";
import cross from "../Assets/img/cross.png";
import exclamation from "../Assets/img/exclamation.png";
import ProfileImage from "./profile-components/ProfileImage";
import LeftNav from "./navbar-components/LeftNav";
import company from "../Assets/img/company.png";
import privacy from "../Assets/img/privacy.png";
import security from "../Assets/img/security.png";

function Profile() {
  const [data, setData] = useState([]);

  const [settingsType, setSettingsType] = useState("account");
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
  }, []);

  function handleSettingsChange(e) {
    setSettingsType(e.target.id);
    if (e.target.id === "security") {
      setting();
    }
  }

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
    <div className="profile">
      <Navbar title="Profile" />
      <LeftNav
        page="profile"
        setting={setting}
        handleSettings={handleSettingsChange}
      />
      <section id="profile" className="profile__section">
        <div className="container-fluid">
          <div className="row flex-wrap justify-between">
            {settingsType === "account" && (
              <>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-10 d-flex justify-content-center">
                      <ProfileImage />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-5 profile__card">
                      <div className="card" style={{ height: "250px" }}>
                        <div className="card-body">
                          <div className="content-box">
                            <div>
                              <h5>Personal Information</h5>
                              <small>See the data in your Vifbox Account</small>
                            </div>
                            <div>
                              <img src={privacy} alt="" />
                            </div>
                          </div>
                          <div className="link-box">
                            <hr />
                            <Link to="profile/personal-information">
                              Manage your data
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5 profile__card">
                      <div className="card " style={{ height: "250px" }}>
                        <div className="card-body">
                          <div className="content-box">
                            <div>
                              <h5>Company Information</h5>
                              <small>See the data in your Vifbox Account</small>
                            </div>
                            <div>
                              <img src={company} alt="" />
                            </div>
                          </div>
                          <div className="link-box">
                            <hr />
                            <Link to="profile/company-information">
                              Manage your data
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-5 pb-5">
                    <div className="col-lg-5 profile__card">
                      <div className="card" style={{ height: "250px" }}>
                        <div className="card-body">
                          <div className="content-box">
                            <div>
                              <h5>General Preferences</h5>
                              <small>
                                Manage settings for Vifbox services on the web
                              </small>
                            </div>
                            <div>
                              <img src={security} alt="" />
                            </div>
                          </div>
                          <div className="link-box">
                            <hr />
                            <Link to="profile/general-information">
                              Manage your data
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {settingsType === "security" && (
              <div className="col-lg-4 mt-3  profile__card">
                <div className="card" style={{ height: "250px" }}>
                  <div className="card-body">
                    <div className="content-box">
                      <div>
                        <h5>Change Password</h5>
                        <small>See the data in your Vifbox Account</small>
                      </div>
                      <div>
                        <img src={privacy} alt="" />
                      </div>
                    </div>
                    <div className="link-box">
                      <hr />
                      <Link to="profile/change-password">Manage your data</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {settingsType === "security" && (
              <div className="col-lg-4 mt-3  profile__card">
                <div className="card" style={{ height: "250px" }}>
                  <div className="card-body">
                    <div className="content-box">
                      <div>
                        <h5>Account Security</h5>
                        <small>See the data in your Vifbox Account</small>
                      </div>
                      <div>
                        <img src={privacy} alt="" />
                      </div>
                    </div>
                    <div className="link-box">
                      <hr />
                      <Link to="profile/account-security">
                        Manage your data
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
