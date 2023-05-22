import http from "../../http-common"
import axios from "axios";

const register = (login, password) => {
  return http.post("auth/signup/", {
    login,
    password
  });
};

const login = (login, password) => {
  return http.post("auth/signin/", {
    login,
    password,
  }).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const updatePassword = (password) => {
  return http.put("auth/users/", {
    id,
    password
  });
};

const updatePassword2 = (password) => {
  return http.put(`auth/users/2`, password
  );
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updatePassword,
  updatePassword2
};