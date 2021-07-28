import Axios from "axios";
import { authToken } from "src/utils";

export const deleteFoodEntry = async (entryId) => {
  const response = await Axios.delete(`http://localhost:3000/food_entries/${entryId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
  });

  return response.data;
};
