import axios from 'axios';

const { REACT_APP_API } = process.env;

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

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
  baseURL: REACT_APP_API,
});

export const setToken = (token?: string) => {
  if (token) {
    loginClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    loginClient.defaults.headers.common['Authorization'] = '';
  }
};

loginClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response.status == 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        return client
          .post<never, RefreshResponse>('/auth/refresh', {
            refreshToken,
          })
          .then((response) => {
            setToken(response.accessToken); //Set authorization header to login Client

            error.response.config.headers[
              'Authorization'
            ] = `Bearer ${response.accessToken}`; //Set authorization header to failed request
            localStorage.setItem('refreshToken', response.refreshToken);
            return loginClient(error.response.config);
          })
          .catch((error) => {
            if (error.response.status === 403) {
              localStorage.clear();
              window.location.href = '/';
            }
          });
      }
    }

    return Promise.reject(error);
  }
);
