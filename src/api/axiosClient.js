import axios from 'axios';
import { URLS } from '../constants';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'content-type': 'application/json',
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    console.log(error.response);
    const { config, status, data } = error.response;
    if (URLS.includes(config.url) && status === 400) {
      const dataError = data.data || [];
      const errorList = dataError[0].messages;
      const errorMess = errorList[0];
      throw new Error(errorMess.message);
    } else {
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
