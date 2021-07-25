import Axios from "axios";

export const getFoodEntries = async () => {
  const {
    data: { food_entries: foodEntries },
  } = await Axios.get("http://localhost:3000/food_entries", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return foodEntries;
};
