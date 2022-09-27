import axios from "axios";

export const SRV_URL = "http://localhost:8080/api"

export default axios.create({

  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api",
  headers: { "Content-type": "application/json" },
});
