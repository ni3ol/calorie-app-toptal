import Axios from "axios";
import { authToken } from "src/utils";

export const getAdminFoodStatistics = async () => {
  const {
    data,
  } = await Axios.get("http://localhost:3000/admin_food_statistics", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": authToken,
    },
  });

  return {
    currentDayEntriesCount: data.current_day_entries_count,
    averageCaloriesPerDay: data.average_calories_per_day,
    lastWeekEntriesCount: data.last_week_entries_count,
    twoWeeksAgoEntriesCount: data.two_weeks_ago_entries_count,
    currentDate: data.current_date,
    towWeeksAgoDateRange: data.two_weeks_ago_date_range,
    lastWeekDateRange: data.last_week_date_range
  };
};
