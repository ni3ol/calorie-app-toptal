import Axios from "axios";

export const getAdminFoodStatistics = async () => {
  const {
    data,
  } = await Axios.get("http://localhost:3000/admin_food_statistics", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    currentDayEntriesCount: data.current_day_entries_count,
    lastWeekAverageCaloriesPerUserCount: data.last_week_average_calories_per_user_count,
    lastWeekEntriesCount: data.last_week_entries_count,
    twoWeeksAgoEntriesCount: data.two_weeks_ago_entries_count
  };
};
