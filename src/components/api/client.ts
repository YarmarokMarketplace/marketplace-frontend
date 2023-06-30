import axios from "axios";

// const { REACT_APP_API } = process.env;

export const client = axios.create({
  baseURL: "https://yarmarok.onrender.com/api/",
});

client.interceptors.response.use(
  (response) => response.data.result,
  (error) => {
    return Promise.reject(error);
  }
);
