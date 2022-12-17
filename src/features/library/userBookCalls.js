import API from "../../lib/authAxios";
import { updateFriendsBookRequests } from "../Friends";
import { addNotification } from "../Notifications";

export const addBook = async ({ bookDto }) => {
  const { google_id, coverImg, title, authors, description, pageCount } =
    bookDto;
  try {
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
    return Promise.reject(error);
  }
};

export const getBookRequest = async (request_id) => {
  try {
    const res = await API.get(`/user-books/request/${request_id}`);
    return res.data;
  } catch (error) {
    return { error };
  }
};

export const createBookRequest = async ({ userBook_id }, { dispatch }) => {
  try {
    const res = await API.post(`/user-books/request`, {
      userBook_id,
    });
    const { request_id, notification } = res.data;
    dispatch(addNotification({ notification }));
    dispatch(updateFriendsBookRequests({ request_id, userBook_id }));
    return { userBook_id };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCurrentRead = async ({ userBook_id }) => {
  try {
    const res = await API.put(`/user/setCurrentRead/${userBook_id}`);
    if (!res.data.currentRead) throw new Error("current read was not updated");
    return { userBook_id };
  } catch (error) {
    console.error("error in catch", error);
    return Promise.reject(error);
  }
};

export const nextBookRequestStatus = async (request_id) => {
  try {
    const res = await API.put(`/user-books/request/${request_id}/status/next`);

    const notification = res.data;
    return notification;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateCurrentPage = async ({ request_id, pageCount }) => {
  try {
    console.log(
      `%cpageCount:`,
      "color:yellow; font-size:14px; font-weight:bold",
      pageCount
    );

    const res = await API.put(
      `/user-books/request/${request_id}/updatePageCount`,
      { pageCount }
    );
    const _pageCount = res.data;
    return { pageCount: _pageCount };
  } catch (error) {
    return Promise.reject(error);
  }
};
