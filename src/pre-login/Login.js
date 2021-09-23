import React from "react";
import logo from "../logo.png";
import "./PreLogin.css";
import gitHub from "../Assets/img/gitHub.png";
import { Link, useHistory } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import url from "../Services/axois";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
  };
  const signIn = (values) => {
    console.log(values);
    axios
      .post(`${url}/api/login/`, values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("auth_pass", res.data.access);
          localStorage.setItem("refresh_auth_pass", res.data.refresh);
          history.push("/profile");
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
              <h1 className="text-center color__primary">Login</h1>
              <p className="text-center">
                Don’t have an account?
                <span className="color__secondary font-weight-bold">
                  <Link to="/sign-up" className="color__secondary">
                    Sign up
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="row mt-5 pt-md-5">
            <div className="col-md-7">
              <Formik initialValues={initialValues} onSubmit={signIn}>
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      aria-describedby="emailHelp"
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="row">
                    {/* <div className="col-6">
                    <div class="form-check">
                      <Field
                        type="checkbox"
                        className="form-check-Field"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" htmlFor="exampleCheck1">
                        Remember me
                      </label>
                    </div>
                  </div> */}
                    <div className="col-12 d-flex justify-content-end">
                      <small className="color__primary">
                        <Link
                          to="/forget-password"
                          className="color__primary font-weight-bold"
                        >
                          FORGET PASSWORD?
                        </Link>
                      </small>
                    </div>
                  </div>

                  <button className="btn preLogin__btn mt-5" type="submit">
                    {/* <Link to="/profile" className="text-light"> */}
                    Login
                    {/* </Link> */}
                  </button>
                  <p className="text-center mt-2" style={{ fontSize: "14px" }}>
                    By signing in, you agree to vifbox's
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

export default Login;
