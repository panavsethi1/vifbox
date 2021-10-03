import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "../Assets/css/Profile.css";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import url from "../Services/axois";
import refreshToken from "../Services/auth";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Select from "react-select";
import themes from "./themes";

function GeneralInformation() {
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
  const [theme, setTheme] = useState("");

  const options = [];

  Object.keys(themes).forEach((theme) => {
    options.push({
      value: theme,
      label: theme.charAt(0).toUpperCase() + theme.slice(1),
    });
  });

  const handleChange = (selectedTheme) => {
    setTheme(themes[selectedTheme.value]);
  };
  const refCallback = (node) => {
    if (node) {
      theme &&
        Object.keys(theme).forEach((element) => {
          node.style.setProperty(element, theme[element], "important");
          if (element === "background-color" || element === "background") {
            // apply the same background mentioned for theme to the body of the website
            document.body.style.background = theme[element];
          }
        });
    }
  };
  useEffect(() => {
    // refreshToken();
    getUserData();
  }, []);
  return (
    <div className="generalInformation" ref={refCallback}>
      <Navbar />
      <section className="generalInformation__section">
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
                  <Formik>
                    <Form>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="name">Theme</label>
                            <Select
                              className="select-filter"
                              onChange={handleChange}
                              options={options}
                            />
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

export default GeneralInformation;
