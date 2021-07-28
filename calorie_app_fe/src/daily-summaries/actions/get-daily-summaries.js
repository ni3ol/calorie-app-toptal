import Axios from "axios";
import { authToken } from "src/utils";
import { USER_ID } from "src/utils/user";

export const getDailySummaries = async () => {
  const {
    data: { daily_calorie_amount_per_day: dailyCalorieAmountPerDay, daily_calorie_limit: dailyCalorieLimit },
  } = await Axios.get("http://localhost:3000/daily_summary", {
    params: {
      user_id: USER_ID
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
  });

  return { dailyCalorieAmountPerDay, dailyCalorieLimit};
};
