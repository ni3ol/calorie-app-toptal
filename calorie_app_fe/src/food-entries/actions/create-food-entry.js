import Axios from "axios";
import { authToken } from "src/utils";
import { USER_ID } from "src/utils/user";

export const createFoodEntry = async ({
  name,
  calories,
  consumedAt,
}) => {
  const response = await Axios.post("http://localhost:3000/food_entries", {
    params: {
      user_id: USER_ID,
      name,
      calories,
      consumed_at: consumedAt,
      price: 0,
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
  });

  const foodEntry = response.data;

  return foodEntry;
};
