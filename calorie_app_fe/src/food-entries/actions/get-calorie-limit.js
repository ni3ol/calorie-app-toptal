import Axios from "axios";

export const getCalorieLimit = async () => {
  const {
    data: { daily_calorie_limit: calorieLimit },
  } = await Axios.get("http://localhost:3000/user_limits", {
    params: { user_id: 4},
    headers: {
      "Content-Type": "application/json",
    },
  });

  return calorieLimit
};
