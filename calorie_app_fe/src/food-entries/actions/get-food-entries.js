import Axios from "axios";
import { authToken } from "src/utils";

export const getFoodEntries = async ({user_id}) => {
  const {
    data: { food_entries: foodEntries },
  } = await Axios.get("http://localhost:3000/food_entries", {
    params: { user_id },
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
  });

  return foodEntries;
};
