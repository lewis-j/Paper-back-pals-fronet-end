import API from "../../lib/authAxios";
import { updateFriendsBookRequests } from "../Friends";
import { addNotification } from "../Notifications";

export const addBook = async ({ bookDto }) => {
  try {
    const { google_id, coverImg, title, authors, description, pageCount } =
      bookDto;
    const res = await API.post(`/user-books`, {
      google_id,
      coverImg,
      title,
      authors,
      description,
      pageCount,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to add book:", error);
    return Promise.reject(error);
  }
};

export const deleteUserBook = async (userBook_id) => {
  try {
    await API.delete(`/user-books/${userBook_id}`);
    return { userBook_id };
  } catch (error) {
    console.error("Failed to delete book:", error);
    return Promise.reject(error);
  }
};

export const getBookRequest = async (request_id) => {
  try {
    const res = await API.get(`/user-books/request/${request_id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch book request:", error);
    return Promise.reject(error);
  }
};

export const createBookRequest = async ({ userBook_id }, { dispatch }) => {
  try {
    const res = await API.post(`/user-books/request`, { userBook_id });
    const { request_id, notification } = res.data;
    dispatch(addNotification({ notification }));
    dispatch(updateFriendsBookRequests({ request_id, userBook_id }));
    return { userBook_id };
  } catch (error) {
    console.error("Failed to create book request:", error);
    return Promise.reject(error);
  }
};

export const updateCurrentRead = async ({ userBook_id }) => {
  try {
    const res = await API.put(`/user/setCurrentRead/${userBook_id}`);
    if (!res.data.currentRead) {
      throw new Error("Current read was not updated");
    }
    return { userBook_id };
  } catch (error) {
    console.error("Failed to update current read:", error);
    return Promise.reject(error);
  }
};

export const nextBookRequestStatus = async (request_id, { dispatch }) => {
  try {
    const res = await API.put(`/user-books/request/${request_id}/status/next`);
    const { notification, bookRequest } = res.data;
    dispatch(addNotification({ notification }));
    return { notification, bookRequest };
  } catch (error) {
    console.error("Failed to update book request status:", error);
    return Promise.reject(error);
  }
};

export const updateCurrentPage = async ({
  request_id,
  currentPage,
  userBook_id,
}) => {
  try {
    const res = await API.put(
      `/user-books/request/${request_id}/updatePageCount`,
      { currentPage }
    );
    if (res.status !== 200) {
      throw new Error("Failed to update page count");
    }
    return { currentPage, userBook_id };
  } catch (error) {
    console.error("Failed to update current page:", error);
    return Promise.reject(error);
  }
};
