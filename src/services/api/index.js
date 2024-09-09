import axios from "axios";
import { config } from "../../config/index";
import storage from "../storage";
import { get } from "lodash";

const token = "d228f88a47e0bb9db1d171e8ffe7de9b53a2a476";
const request = axios.create({
  baseURL: config.API_URL,
  params: {},
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Token ${token}`,
    },
  },
});
request.interceptors.request.use(
  (config) => {
    const token = get(
      JSON.parse(storage.get("settings")),
      "state.token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInN0aXIiOiIxMjM2NTQ3Iiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNzI2MDAxMTQ2LCJpYXQiOjE3MjU5MTExNDZ9.3WPGxCz392HiMtyXGOfWa-6fs7gS23m0NyfHXR7Pyt8"
    );

    if (token) {
      config.headers["token"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { request };
