import Axios from "axios";

export const getDailySummaries = async () => {
  return [
    {
      createdAt: "2021-07-24",
      calorieLimit: 2100,
      calorieAmount: 2200,
    },
    {
      createdAt: "2021-07-23",
      calorieLimit: 2100,
      calorieAmount: 2000,
    },
  ];
};
