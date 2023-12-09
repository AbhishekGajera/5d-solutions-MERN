import axios from "axios";

const createAxiosInstance = (contentType) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-Type": contentType,
    },
  });

  // Set Authorization header dynamically
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  return instance;
};

const axiosInstanceJson = createAxiosInstance("application/json");
const axiosInstanceFormData = createAxiosInstance("multipart/form-data");

const handleApiError = (error) => {
  if (error.response && error.response.status === 401) {
    // Redirect the user to the signin page
    window.location.href = "/signin";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  throw error;
};

const makeApiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axiosInstanceJson({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const makeFormDataApiRequest = async (method, endpoint, data = null) => {
  try {
    const response = await axiosInstanceFormData({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// auth functions
export const registerUser = (data) =>
  makeApiRequest("POST", `/api/auth/register`, data);
export const signinUser = (data) =>
  makeApiRequest("POST", "/api/auth/login", data);

// moment functions
export const createNewMoment = (data) =>
  makeFormDataApiRequest("POST", `/api/moments`, data);
export const listMoment = (data) => makeApiRequest("GET", "/api/moments", data);
