import React, { useState } from "react";
import "./LeftNav.css";
import add from "../../Assets/img/math-plus.svg";
import hamburger from "../../Assets/img/hamburger-menu.svg";

function LeftNav({ page, setting, handleSettings }) {
  const [settingsType, setSettingsType] = useState("account");
  const [isOpen, setIsOpen] = useState("false");

  function handleSettingsChange(e) {
    setSettingsType(e.target.id);
    handleSettings(e);
    if (e.target.id === "security") {
      setting();
    }
    if (window.innerWidth < 768) {
      handleHamburger();
    }
  }

  function handleHamburger() {
    setIsOpen(!isOpen);
    if (isOpen) {
      document.getElementById("left-nav").style.display = "initial";
    } else {
      document.getElementById("left-nav").style.display = "none";
    }
  }

  return (
    <>
      <div id="left-nav" className="left-nav">
        {page === "dashboard" && (
          <div className="left-nav__list">
            <div className="left-nav__new">
              <img src={add} alt="" />
              <p>New</p>
            </div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <svg
                  className="mr-2"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="#5f6368"
                  focusable="false"
                >
                  <path d="M15,5c2.2,0,4,1.8,4,4v6c0,2.2-1.8,4-4,4H9c-2.2,0-4-1.8-4-4V9c0-2.2,1.8-4,4-4H15 M15,3H9C5.7,3,3,5.7,3,9v6  c0,3.3,2.7,6,6,6h6c3.3,0,6-2.7,6-6V9C21,5.7,18.3,3,15,3L15,3z"></path>
                  <path d="M11,13.2L8.8,11l-1.4,1.4L11,16l6-6l-1.4-1.4L11,13.2z"></path>
                </svg>{" "}
                My Portfolio
              </li>
              <li>
                <svg
                  className="mr-2"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="#5f6368"
                  focusable="false"
                >
                  <path d="M19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2ZM19 20H5V19H19V20ZM19 17H5V4H19V17Z"></path>
                  <path d="M13.1215 6H10.8785C10.5514 6 10.271 6.18692 10.0841 6.46729L7.14019 11.6075C7 11.8878 7 12.215 7.14019 12.4953L8.26168 14.4579C8.40187 14.7383 8.72897 14.9252 9.05608 14.9252H15.0374C15.3645 14.9252 15.6449 14.7383 15.8318 14.4579L16.9533 12.4953C17.0935 12.215 17.0935 11.8878 16.9533 11.6075L13.9159 6.46729C13.7757 6.18692 13.4486 6 13.1215 6ZM10.1776 12.0748L12.0467 8.8972L13.8692 12.0748H10.1776Z"></path>
                </svg>{" "}
                My Project
              </li>
            </ul>
          </div>
        )}
        {page === "profile" && (
          <>
            <div onClick={handleSettingsChange} id="account">
              <p
                id="account"
                className={
                  settingsType === "account"
                    ? "active__profile"
                    : "inactive__profile ml-2"
                }
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-user-cog"></i> Account Preferences
              </p>
            </div>
            <div onClick={handleSettingsChange} id="security">
              <p
                id="security"
                className={
                  settingsType === "security"
                    ? "active__profile"
                    : "inactive__profile ml-2"
                }
                style={{ cursor: "pointer" }}
              >
                <i className="fas fa-user-shield"></i> Sign in & Security
              </p>
            </div>
          </>
        )}
      </div>
      <div id="hamburger" onClick={handleHamburger}>
        <img onClick={handleHamburger} src={hamburger} alt="" />
      </div>
    </>
  );
}

export default LeftNav;
