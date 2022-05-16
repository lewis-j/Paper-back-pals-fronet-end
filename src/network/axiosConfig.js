import axios from "axios";

let nestApi = axios.create({
  baseURL: process.env.REACT_APP_NEST_URI,
});

export const getClient = () => {
  return nestApi;
};

export const setToken = (_token) => {
  nestApi.interceptors.request.use((config) => {
    const token = _token || null;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
};

export const handleAxiosError = (error) => {
  if (error.response)
    return `Error in response: status:${error.response.status} headers: ${error.response.headers} data:${error.response.data}`;
  if (error.request) return `Error in request: ${error.request}`;

  return `Error ${error.message} ${error.config}`;
};
