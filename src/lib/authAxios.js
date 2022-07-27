import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeAuthUser } from "../features/Authentication";

const API = axios.create({
  baseURL: process.env.REACT_APP_NEST_URI,
  withCredentials: true,
});

export const getClient = () => {
  return API;
};

const setcsrfToken = (_token) => {
  console.log("setting token", _token);
  API.defaults.headers["XSRF-TOKEN"] = _token ? `${_token}` : "";
};

const handleAxiosError = (error) => {
  if (error.response) console.log("error.response", error.response);
  // return `Error in response: status:${error.response.status} headers: ${error.response.headers} data:${error.response.data}`;
  if (error.request) return `Error in request: ${error.request}`;

  return `Error ${error.message} ${error.config}`;
};

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const resInterceptor = (response) => {
      return response;
    };

    const handleStatusCode = async (error) => {
      if (error.response.status === 401) {
        console.log("dispatching removeAuthuser");
        await dispatch(removeAuthUser()).unwrap();
        navigate("landing-page");
      }
      return Promise.reject(error.message);
    };

    const errInterceptor = async (err) => {
      console.log("ERROR IN INTERCEPTOR :::::::::::::", { err });
      if (err?.error?.response) {
        return await handleStatusCode(err.error);
      }
      if (err?.response) {
        return await handleStatusCode(err);
      }

      return Promise.reject(err.message);
    };

    const interceptor = API.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => API.interceptors.response.eject(interceptor);
  }, [navigate, dispatch]);

  return children;
};

export default API;

export { setcsrfToken, handleAxiosError, AxiosInterceptor };
