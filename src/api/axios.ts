import axios from "axios";
// export const BASE_URL = "https://back-end-j1bi.onrender.com";
export const BASE_URL = "https://back-end-j1bi.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
