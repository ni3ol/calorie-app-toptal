import Axios from "axios";
import { authToken } from "src/utils";
import { USER_ID } from "src/utils/user";

export const getCalorieLimit = async () => {
  const {
    data: { daily_calorie_limit: calorieLimit },
  } = await Axios.get("http://localhost:3000/user_limits", {
    params: { user_id: USER_ID },
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
  });

  return calorieLimit;
};
