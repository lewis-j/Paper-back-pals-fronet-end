import axios from "axios";

const handleAxiosError = (error) => {
  if (error.response)
    return `Error in response: status:${error.response.status} headers: ${error.response.headers} data:${error.response.data}`;
  if (error.request) return `Error in request: ${error.request}`;

  return `Error ${error.message} ${error.config}`;
};

export const fetchBooks = async (id) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_NEST_URI + "/user-books"
    );
    return response.data;
  } catch (error) {
    const errorMsg = handleAxiosError(error);
    return Promise.reject(errorMsg);
  }
};
