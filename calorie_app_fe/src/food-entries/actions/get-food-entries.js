import Axios from "axios";

export const getFoodEntries = async ({user_id}) => {
  const {
    data: { food_entries: foodEntries },
  } = await Axios.get("http://localhost:3000/food_entries", {
    params: { user_id },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return foodEntries;
};
