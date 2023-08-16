import axios from "axios";

const { REACT_APP_API, REACT_APP_PR_API } = process.env;

export const client = axios.create({
  baseURL: REACT_APP_API,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export const loginClient = axios.create({
  baseURL: REACT_APP_PR_API,
})

export const setToken = (token?: string) => {
  if (token) {
    return loginClient.defaults.headers.common.authorization = `Bearer ${token}`;
  }
  loginClient.defaults.headers.common.authorization = "";
}

loginClient.interceptors.response.use(response => response.data, async (error) => {
  if (error.response.status == 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const { data } = await loginClient.post("/auth/refresh", { refreshToken })
      setToken(data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      return loginClient(error.config);
    }
  }
  return Promise.reject(error);
})
