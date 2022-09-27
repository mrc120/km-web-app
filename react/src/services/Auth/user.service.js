import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const getAddUserBoard = () => {
  return axios.get(API_URL + "add_user", { headers: authHeader() });
};
const getAddFileBoard = () => {
  return axios.get(API_URL + "add_file", { headers: authHeader() });
};

export default {
  getPublicContent,
  getAdminBoard,
  getAddUserBoard,
  getAddFileBoard
};