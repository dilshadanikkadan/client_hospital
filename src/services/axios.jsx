import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://back-end-hospital-management.onrender.com",
  withCredentials: true,
});

export const getRequest = (url, params) => {
  return axiosInstance.get(url, { params });
};

export const deleterequest = (url, params) => {
  return axiosInstance.delete(url, params);
};

export const postRequest = (url, params) => {
  try {
    return axiosInstance.post(url, params);
  } catch (error) {
    console.log(error);
  }
};
