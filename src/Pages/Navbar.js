import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/img/logo_small.png";
import profile from "../Assets/img/profile.png";

function Navbar() {
  return (
    <div className="navbar__section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link className="navbar-brand" href="#">
                <img
                  src={logo}
                  alt=""
                  className="img-fluid"
                  style={{ width: "65px" }}
                />
              </Link>
              <button
                className="navbar-toggler d-none"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              > */}
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <h2 className="font-weight-bold color__primary ml-md-5">
                    Profile
                  </h2>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <img
                  src={profile}
                  alt=""
                  className="img-fluid"
                  style={{ width: "80px" }}
                />
              </form>
              {/* </div> */}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
