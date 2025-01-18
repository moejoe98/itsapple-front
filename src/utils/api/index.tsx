import axios from "axios";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const api = axios.create({
  baseURL: "/api",
  headers: {},
});

api.interceptors.request.use(
  (config) => {
    const token = cookie.get("token");
    const user = cookie.get("userData");
    if (token && user) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.data.statusCode === 401) {
      cookie.remove("token");
      cookie.remove("userData");
      window.location.href = "/login";
    } else if (err.response.data.statusCode === 403) {
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
