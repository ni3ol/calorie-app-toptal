import Axios from "axios";

export const createFoodEntry = async ({
  name,
  calories,
  consumedAt,
  price,
}) => {
  const response = await Axios.post("http://localhost:3000/food_entries", {
    params: {
      name,
      calories,
      consumed_at: consumedAt,
      price,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  const foodEntry = response.data;

  return foodEntry;
};
