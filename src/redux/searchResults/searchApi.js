import axios from "axios";
import { subArrays } from "../../utilities/arrayUtil";

export const searchBooks = async (query, startIndex = 0) => {
  console.log("Query", query);
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${36}`
    );

    const results = subArrays(res.data.items, 12);

    return { bookResults: results };
  } catch (error) {
    return Promise.reject(error);
  }
};
