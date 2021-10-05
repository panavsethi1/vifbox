import React, { useState } from "react";
import logo from "../logo.png";
import "./PreLogin.css";
import gitHub from "../Assets/img/gitHub.png";
import { Link, useHistory } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import url from "../Services/axois";
import axios from "axios";
import Swal from "sweetalert2";
import LoginGithub from "react-login-github";

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
        if (res.data.code === 200) {
          Swal.fire({
            icon: "success",
            text: "Email was sent to you, please verify your email to activate your account.",
          });
          history.push("/");
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.response.data.error,
        });
      });
  };

  const onSuccess = (response) => console.log(response);
  const onFailure = (response) => console.error(response);

  const isGood = (e) => {
    const password = e.target.value;
    var password_strength = document.getElementById("password-text");

    //TextBox left blank.
    if (password.length == 0) {
      password_strength.innerHTML = "";
      return;
    }

    //Regular Expressions.
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[$@$!%*#?&]"); //Special Character.

    var passed = 0;

    //Validate for each Regular Expression.
    for (var i = 0; i < regex.length; i++) {
      if (new RegExp(regex[i]).test(password)) {
        passed++;
      }
    }

    //Display status.
    var strength = "";

    switch (passed) {
      case 0:
      case 1:
      case 2:
        strength =
          "<small class='progress-bar bg-danger' style='width: 40%'>Weak</small>";
        break;
      case 3:
        strength =
          "<small class='progress-bar bg-warning' style='width: 60%'>Medium</small>";
        break;
      case 4:
        strength =
          "<small class='progress-bar bg-success' style='width: 100%'>Strong</small>";
        break;
    }
    password_strength.innerHTML = strength;
  };

  return (
    <div className="preLogin">
      <section className="navbar__section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 offset-1 mt-3">
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  className="img-fluid"
                  style={{ width: "140px" }}
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
          <div className="row mt-5">
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
                    className="form-group mt-3"
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
                      onKeyUp={isGood}
                    />
                    <small
                      className="help-block mt-2"
                      id="password-text"
                    ></small>
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
            <div className="col-md-4 mb-5 d-flex justify-content-start align-items-center">
              <button className="btn github__btn d-flex align-items-center">
                <img
                  src={gitHub}
                  className="img-fluid mr-3"
                  style={{ width: "30px" }}
                />
                <LoginGithub
                  clientId="65ad233b6c86eb522646"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
