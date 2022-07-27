import API from "../../lib/authAxios";
import { addRequestToCurrentFriend } from "../Friends/friendsSlice";

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

export const createBookRequest = async ({ userBook_id }) => {
  console.log("userbook id in createbook requseta", userBook_id);
  try {
    const res = await API.post(`/user-books/create-request`, {
      userBook_id: userBook_id,
    });
    console.log("RESPONSE", res.data);
    const { _id } = res.data;

    return { userRequest_id: _id, userBook_id };
  } catch (error) {
    return Promise.reject(error);
  }
};
