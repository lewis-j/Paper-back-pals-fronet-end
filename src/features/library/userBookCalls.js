import API from "../../lib/authAxios";

export const addBook = async ({ bookDto }) => {
  const { google_id, coverImg, title, authors, description } = bookDto;
  try {
    const req = await API.post(`/user-books`, {
      google_id,
      coverImg,
      title,
      authors,
      description,
    });

    return req.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
