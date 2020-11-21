import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://3.131.203.184',
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};
