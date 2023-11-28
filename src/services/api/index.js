import axios from "axios";
import { config } from "../../config/index";
import storage from "../storage";
import { get } from "lodash";

const request = axios.create({
  baseURL: config.API_URL,
  params: {},
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
    },
  },
});
request.interceptors.request.use(
  (config) => {
    const token = get(
      JSON.parse(storage.get("settings")),
      "state.token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55X3N0aXIiOiIzMDczMzkxMzMiLCJjb21wYW55X25hbWUiOiJCSVJKQSBUUkFERSBNQ0hKIiwiY29tcGFueV9jZW8iOiJSYXN1bG92IEFudmFyIEhhbWlkb3ZpY2giLCJleHAiOjE3MjQzMjMzNjgsImlhdCI6MTY5Mjc4NzM2OH0.qUZGOZr7dneNyPsQbNY4NH_JC8cMr23sFA2kq4s7QZA",
    );

    if (token) {
      config.headers["token"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { request };
