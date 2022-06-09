import { getClient } from "../authUser/authAxios";

const apiClient = getClient();

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
