import { getClient } from "../../redux";
import { subArrays } from "../../utilities/arrayUtil";

const authAxios = getClient();

export const searchBooks = async (query, startIndex = 0) => {
  try {
    const res = await authAxios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${36}`
    );

    const results = subArrays(res.data.items, 12);

    return { bookResults: results };
  } catch (error) {
    return Promise.reject(error);
  }
};
