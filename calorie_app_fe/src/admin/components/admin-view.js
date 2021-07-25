import React from "react";
import { Container } from "semantic-ui-react";
import { getFoodEntries } from "src/food-entries/actions/get-food-entries";
import { FoodEntryTable } from "src/food-entries/components/food-entry-table";
import { usePromise } from "src/utils";

export const AdminView = () => {
  const { result: foodEntries } = usePromise(async () => {
    const foodEntries = await getFoodEntries();
    return foodEntries;
  }, []);

  return (
    <Container>
      Admin view here
      <FoodEntryTable isAdmin entries={foodEntries || []} />
    </Container>
  );
};
