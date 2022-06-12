import axios from "axios";
import { getClient } from "../authUser/authAxios";
import { subArrays } from "../../utilities/arrayUtil";

const client = getClient();

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

export const searchUsers = async (query) => {
  try {
    const res = await client.get(`user/search?user=${query}`);
    const results = subArrays(res.data, 12);
    return results;
  } catch (error) {
    throw error;
  }
};
