import Axios from "axios";
import { authToken } from "src/utils";

export const updateFoodEntryPrice = async ({
  foodEntryId,
  price,
}) => {
  const response = await Axios.patch(`http://localhost:3000/food_entries/${foodEntryId}`, {
    params: {
      price,
    },
    headers: {
      "Content-Type": "application/json",
      'Authorization': authToken,
    },
  });

  const priceFoodEntry = response.data;

  return priceFoodEntry;
};
