import axios from "axios";
import { config } from "./config";

const instance = axios.create({
  baseURL: config.server.host,
  timeout: 20000,
  withCredentials: true,
  headers: {
    "content-type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
