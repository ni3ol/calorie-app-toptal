import Axios from "axios";
import { authToken } from "src/utils";

export const getUserLogin = async ({ user_id }) => {
  const { data } = await Axios.get("http://localhost:3000/login", {
    params: { user_id },
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  });

  return data;
};
