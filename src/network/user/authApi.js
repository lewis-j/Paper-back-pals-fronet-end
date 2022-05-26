import * as axios from "../axiosConfig";

const client = axios.getClient();

export const postIdTokenToLogin = async (_token) => {
  await enableCsrfProtection();

  await client.post(
    "authentication",
    {},
    { headers: { Authorization: `Bearer ${_token}` } }
  );
};

const enableCsrfProtection = async () => {
  try {
    const res = await client.get("authentication");
    console.log("csrfToken", res.data.csrfToken);
    axios.setcsrfToken(res.data.csrfToken);
  } catch (err) {
    Promise.reject(err);
  }
};
