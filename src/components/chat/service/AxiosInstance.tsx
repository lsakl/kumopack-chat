import axios, { AxiosInstance } from 'axios';

const createAxiosInstance = (baseURL:string, token:string) => {
  const instance: AxiosInstance = axios.create({
    baseURL,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // ทำก่อนส่ง request
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // ทำก่อนใช้งาน response
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance;