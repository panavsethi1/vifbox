import axios from "axios";
import url from "./axois";

const refresh_token = localStorage.getItem("refresh_auth_pass");
const refresh__token__obj = {
  refresh: refresh_token,
};
const refreshToken = () => {
  axios.post(`${url}/api/token/refresh/`, refresh__token__obj).then((res) => {
    localStorage.setItem("auth_pass", res.data.access);
    window.location.reload();
  });
};

export default refreshToken;
