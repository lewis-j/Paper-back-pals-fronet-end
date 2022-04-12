import axios from "axios";
require("dotenv").config();

export const userData = {
  save: async (data) => {
    const json = JSON.stringify(data);
    const res = await axios.post(`${process.env.API_SERVER}/user`, json, {
      "Content-Type": "application/json",
    });
    return res.data;
  },
};
