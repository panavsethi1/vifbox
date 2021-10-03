import React from "react";
import { useState, useEffect } from "react";
import edit from "../../Assets/img/edit-image.svg";
import url from "../../Services/axois";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import refreshToken from "../../Services/auth";

function ProfileImage() {
  const [profileImg, setProfileImg] = useState();
  const [profileImgSent, setProfileImgSent] = useState();
  const [profileTitle, setProfileTitle] = useState([]);
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
          // setProfileTitle(res.data.data.profile_title)
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
  const handleFileChange = (e) => {
    setProfileImgSent(e.target.files[0]);
    setProfileImg(URL.createObjectURL(e.target.files[0]));
  };
  const handleTitleChange = (e) => {
    setProfileTitle(e.target.value);
  };

  const initialValues = {
    profile_img_url: data.profile_img_url,
    profile_title: data.profile_title,
  };

  const profileImage = async () => {
    let formData = new FormData();
    formData.append("profile_img_url", profileImgSent);
    formData.append("profile_title", profileTitle);
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .put(`${url}/api/profile/set_img/`, formData, {
        headers: headers,
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
    <div className="col-md-3">
      <Formik
        initialValues={initialValues}
        onSubmit={profileImage}
        enableReinitialize
      >
        <Form encType="multipart/form-data">
          <div className="row mt-4">
            <div className="col-md-12 d-flex justify-content-center flex-column align-items-center">
              <div className="image-upload">
                <label htmlFor="upload">
                  <img
                    className="image-upload__preview"
                    src={
                      profileImg
                        ? profileImg
                        : data.profile_img_url
                        ? `https://dev.vifbox.org${data.profile_img_url}`
                        : `https://ui-avatars.com/api/name=${data.name}&background=random`
                    }
                    alt=""
                  />
                  <img className="image-upload__edit" src={edit} alt="" />
                </label>
              </div>
              <Field
                id="upload"
                className="image-upload__input"
                type="file"
                onChange={handleFileChange}
                name="profile_url"
                accept="image/*"
              />
              <Field
                type="text"
                className="form-control"
                id="profile_title"
                name="profile_title"
                aria-describedby="emailHelp"
                placeholder="Enter name"
                name="profile_title"
                value={profileTitle}
                onChange={handleTitleChange}
              />
              <div className="row mb-5 justify-content-center">
                <div className="col-md-12">
                  <button
                    className="btn d-block m-auto"
                    type="submit"
                    style={{ color: "#26237b", fontWeight:"bold" }}
                  >
                    SAVE 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ProfileImage;
