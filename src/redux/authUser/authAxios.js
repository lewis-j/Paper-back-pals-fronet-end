import axios from "axios";

let nestApi = axios.create({
  baseURL: process.env.REACT_APP_NEST_URI,
  withCredentials: true,
});

export const getClient = () => {
  return nestApi;
};

// export const setAuthToken = (_token) => {
//   const token = _token || null;

//   nestApi.defaults.headers["Authorization"] = token ? `Bearer ${token}` : "";
// };

export const setcsrfToken = (_token) => {
  console.log("setting token", _token);
  nestApi.defaults.headers["XSRF-TOKEN"] = _token ? `${_token}` : "";
};

export const handleAxiosError = (error) => {
  if (error.response)
    return `Error in response: status:${error.response.status} headers: ${error.response.headers} data:${error.response.data}`;
  if (error.request) return `Error in request: ${error.request}`;

  return `Error ${error.message} ${error.config}`;
};
