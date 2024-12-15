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

export const createBookRequest = async (userBook_id, { dispatch }) => {
  console.log("userBook_id", userBook_id);
  try {
    const res = await API.post(`/user-books/request`, { userBook_id });
    const { bookRequest, notification } = res.data;
    dispatch(addNotification({ notification }));
    dispatch(updateFriendsBookRequests({ bookRequest, userBook_id }));
    console.log("BookRequest", bookRequest);
    return { bookRequest };
  } catch (error) {
    console.error("Failed to create book request:", error);
    return Promise.reject(error);
  }
};

export const declineLendingRequest = async (request_id, { dispatch }) => {
  try {
    const res = await API.put(`/user-books/request/${request_id}/decline`);
    const { notification, bookRequest } = res.data;
    dispatch(addNotification({ notification }));
    return { notification, bookRequest };
  } catch (error) {
    console.error("Failed to remove book request:", error);
    return Promise.reject(error);
  }
};

export const cancelBorrowRequest = async (request_id, { dispatch }) => {
  try {
    const res = await API.put(`/user-books/request/${request_id}/cancel`);
    const { notification, bookRequest } = res.data;
    dispatch(addNotification({ notification }));
    return { bookRequest };
  } catch (error) {
    console.error("Failed to cancel borrow request:", error);
    return Promise.reject(error);
  }
};

export const updateCurrentRead = async (userBook_id) => {
  console.log("userBook_id in updateCurrentRead", userBook_id);
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

export const nextBookRequestStatus = async (
  { request_id, status },
  { dispatch }
) => {
  try {
    const res = await API.put(`/user-books/request/${request_id}/status/next`, {
      status,
    });
    const { notification, bookRequest } = res.data;
    console.log("bookRequest in nextBookRequestStatus", bookRequest);
    dispatch(addNotification({ notification }));
    return { notification, bookRequest };
  } catch (error) {
    console.error("Failed to update book request status:", error);
    return Promise.reject(error);
  }
};

export const initiateBookReturnRequest = async (
  { request_id, status },
  { dispatch }
) => {
  try {
    console.log("request_id in initiateBookReturnRequest", request_id);
    const res = await API.put(
      `/user-books/request/${request_id}/status/return`,
      {
        status,
      }
    );
    const { notification, bookRequest } = res.data;
    console.log("bookRequest in nextBookRequestStatus", bookRequest);
    dispatch(addNotification({ notification }));
    return { notification, bookRequest };
  } catch (error) {
    console.error("Failed to request book return:", error);
    return Promise.reject(error);
  }
};

export const cancelBookReturnRequest = async (request_id) => {
  try {
    const res = await API.put(
      `/user-books/request/${request_id}/status/return/cancel`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to cancel book return:", error);
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
