import Axios from "axios";
import { authToken } from "src/utils";

export const updateFoodEntry = async ({
  entryId,
  name,
  calories,
  consumedAt,
  price,
}) => {
  const response = await Axios.patch(
    `http://localhost:3000/food_entries/${entryId}`,
    {
      params: {
        name,
        calories,
        consumed_at: consumedAt,
        price,
      },
      headers: {
        "Content-Type": "application/json",
        Authentication: authToken,
      },
    }
  );

  const foodEntry = response.data;

  return foodEntry;
};
