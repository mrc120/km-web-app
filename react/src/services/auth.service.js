import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
const API_USER = "http://localhost:8080/api/auth/users";

const register = (email, password) => {
    return axios.post(API_URL + "signup", {
        email,
        password
    });
};

const updatePassword = (password) => {
  return axios.put(API_URL + "users", {
      id,
      password
  });
};

const login = (email, password) => {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
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
    updatePassword
  };