import { getClient, handleAxiosError } from "./axiosConfig";
import { fetchBooks as getBooks } from "../redux/userBook/userBooksSlice";

const apiClient = getClient();

export const fetchBooks = async ({ id }) => {
  try {
    const response = await apiClient.get(`/user-books/${id}`);
    return response.data;
  } catch (error) {
    const errorMsg = handleAxiosError(error);
    return Promise.reject(errorMsg);
  }
};

export const addBook = async ({ id, bookDto }, { dispatch }) => {
  const { google_id, coverImg, title, authors, description } = bookDto;
  try {
    await apiClient.post(`/user-books/${id}`, {
      google_id,
      coverImg,
      title,
      authors,
      description,
    });

    dispatch(getBooks({ id }));
  } catch (error) {
    return Promise.reject(error);
  }
};
