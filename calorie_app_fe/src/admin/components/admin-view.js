import React from "react";
import { Container } from "semantic-ui-react";
import { getFoodEntries } from "src/food-entries/actions/get-food-entries";
import { FoodEntryTable } from "src/food-entries/components/food-entry-table";
import { AdminFoodEntryStatistics } from "../components/admin-food-entry-statistics";
import { usePromise } from "src/utils";
import { getAdminFoodStatistics } from "../actions/get-admin-food-statistics";

export const AdminView = () => {
  const { result: foodEntries } = usePromise(async () => {
    const foodEntries = await getFoodEntries();
    return foodEntries;
  }, []);

  const { result: statistics } = usePromise(async () => {
    const statistics = await getAdminFoodStatistics();
    return statistics;
  }, []);

  return (
    <Container>
      Admin view here
      <AdminFoodEntryStatistics statistics={statistics || []} />
      <FoodEntryTable isAdmin entries={foodEntries || []} />
    </Container>
  );
};
