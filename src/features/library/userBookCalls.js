import API from "../../lib/authAxios";
import { createBookRequestNotification } from "../Notifications";

export const addBook = async ({ bookDto }) => {
  const { google_id, coverImg, title, authors, description } = bookDto;
  try {
    const res = await API.post(`/user-books`, {
      google_id,
      coverImg,
      title,
      authors,
      description,
    });

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createBookRequest = async (
  { userBook_id, recipient_id },
  { dispatch }
) => {
  console.log("userbook id in createbook requseta", userBook_id);
  try {
    const res = await API.post(`/user-books/create-request`, {
      userBook_id: userBook_id,
    });
    const { _id: request_id } = res.data;

    dispatch(createBookRequestNotification(recipient_id, request_id));

    return { request_id, userBook_id };
  } catch (error) {
    return Promise.reject(error);
  }
};
