// Code to interact with the backend API
import { message } from "antd";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/";

const baseApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const getAccessToken = () => localStorage.getItem("access");
const getRefreshToken = () => localStorage.getItem("refresh");

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken || isTokenExpired(refreshToken)) {
    logout();
    throw new Error("No refresh token available");
  }

  try {
    const response = await baseApi.post("token/refresh/", {
      refresh: refreshToken,
    });

    const { access } = response.data;
    localStorage.setItem("access", access);
    return access;
  } catch (error) {
    logout();
    return Promise.reject(error);
  }
};

baseApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return baseApi(originalRequest);
      } catch (refreshError) {
        // console.log("refreshError", refreshError);

        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  message.error("Session expired. Please login again.");
  window.location.href = "auth";
};

export default baseApi;
