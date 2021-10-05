import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../Assets/img/logo_small.png";
import logout from "../Assets/img/logout.png";
import search from "../Assets/img/search-line.svg";
import "../Assets/css/Navbar.css";
import axios from "axios";
import url from "../Services/axois";
import Swal from "sweetalert2";
import refreshToken from "../Services/auth";
import noti from "../Assets/img/bell.svg";
import Notifications from "./navbar-components/Notifications";

function Navbar(props) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState();
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const token = localStorage.getItem("auth_pass");

  const getUserData = () => {
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
  };

  const getUserImage = () => {
    axios
      .get(`${url}/api/profile/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfileData(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleNotiClick = () => {
    setIsNotiOpen(!isNotiOpen);
  };

  useEffect(() => {
    getUserData();
    getUserImage();
  }, []);

  function logOut() {
    localStorage.removeItem("auth_pass");
    localStorage.removeItem("refresh_auth_pass");
    history.push("/");
    Swal.fire({
      icon: "success",
      text: "User Logged Out successfully!",
    });
  }

  return (
    <>
      <div className="navbar__section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/dashboard" className="navbar-brand">
                  <img src={logo} alt="" className="img-fluid" />
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
                <div className="search-box">
                  <img src={search} alt="" />
                  <input className="search-input" placeholder="Search" />
                  <svg
                    class=""
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    focusable="false"
                    fill="#5f6368"
                  >
                    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
                  </svg>
                </div>
                {/* <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              > */}
                {/* <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <h2 className="font-weight-bold color__primary ml-md-5">
                      {props.title}
                    </h2>
                  </li>
                </ul> */}
                <div className="form-inline my-2 my-lg-0 d-flex align-items-center ml-auto">
                  <img
                    onClick={handleNotiClick}
                    src={noti}
                    className="navbar__notification"
                    alt=""
                  />
                  <img
                    src={`https://dev.vifbox.org${data.profile_img_url}`}
                    alt=""
                    className="img-fluid mr-2 navbar-img"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />

                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {data.name}
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                      >
                        <Link to="/profile" className="text-dark">
                          Manage Account
                        </Link>
                      </div>
                      <div
                        className="dropdown-item mt-3"
                        style={{ cursor: "pointer" }}
                      >
                        <Link
                          to="/upgrade"
                          className="text-warning font-weight-bold"
                        >
                          Upgrade
                        </Link>
                      </div>
                      <div
                        className="dropdown-item mt-3"
                        onClick={logOut}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={logout} alt="" className="img-fluid" />
                        Logout
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </nav>
            </div>
          </div>
        </div>
      </div>
      {isNotiOpen && <Notifications handleClose={handleNotiClick} />}
    </>
  );
}

export default Navbar;
