import { getClient, handleAxiosError } from "../axiosConfig";
import { setBook } from "../../redux/userBook/userBooksSlice";

const apiClient = getClient();
export const fetchBooks = async () => {
  try {
    const ownedRes = await apiClient.get(`/user-books/owned`);
    const borrowedRes = await apiClient.get(`/user-books/borrowed`);
    return { borrowed: borrowedRes.data, owned: ownedRes.data };
  } catch (error) {
    const errorMsg = handleAxiosError(error);
    return Promise.reject(errorMsg);
  }
};

export const addBook = async ({ bookDto }, { dispatch }) => {
  const { google_id, coverImg, title, authors, description } = bookDto;
  try {
    const req = await apiClient.post(`/user-books`, {
      google_id,
      coverImg,
      title,
      authors,
      description,
    });

    return req.data;

    // dispatch(
    //   setBook({ book: { ...bookDto }, status: "CHECKED_IN", _id, owner: id })
    // );
  } catch (error) {
    return Promise.reject(error);
  }
};
