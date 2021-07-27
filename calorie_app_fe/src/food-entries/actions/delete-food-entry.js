import Axios from "axios";

export const deleteFoodEntry = async (entryId) => {
  const response = await Axios.delete(`http://localhost:3000/food_entries/${entryId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
