import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import { getFoodEntries } from "src/food-entries/actions/get-food-entries";
import { FoodEntryTable } from "src/food-entries/components/food-entry-table";
import { AdminFoodEntryStatistics } from "../components/admin-food-entry-statistics";
import { usePromise, usePromiseLazy } from "src/utils";
import { getAdminFoodStatistics } from "../actions/get-admin-food-statistics";
import { NewFoodEntryModal } from "src/food-entries/components/new-food-entry-modal";
import { deleteFoodEntry } from "src/food-entries/actions/delete-food-entry";
import { AdminAverageCalorieTable } from "./admin-average-calorie-table";
import { UpdateFoodEntryModal } from "src/food-entries/components/update-food-entry-modal";
import { ADMIN_USER_ID, USER_ID } from "src/utils/user";

export const AdminView = (props) => {
  const [showNewFoodEntryModal, setShowNewFoodEntryModal] = useState(false);
  const [foodEntryToUpdate, setFoodEntryToUpdate] = useState();

  // useEffect(() => {
  //   if (USER_ID !== ADMIN_USER_ID) {
  //     props.history.push('/')
  //   }
  // })

  const { result: foodEntries, execute } = usePromise(async () => {
    const foodEntries = await getFoodEntries({ user_id: ADMIN_USER_ID});
    return foodEntries;
  }, []);

  const { result: statistics } = usePromise(async () => {
    const statistics = await getAdminFoodStatistics();
    return statistics;
  }, []);

  const { execute: wrappedDeleteFoodEntry } = usePromiseLazy(
    async (entryId) => {
      await deleteFoodEntry(entryId);
      await execute();
    },
    []
  );

  return (
    <Container>
      {showNewFoodEntryModal && (
        <NewFoodEntryModal
          onClose={() => setShowNewFoodEntryModal(false)}
          onFoodEntryCreated={() => {
            execute();
            setShowNewFoodEntryModal(false);
          }}
        />
      )}
      {foodEntryToUpdate && (
        <UpdateFoodEntryModal
          onClose={() => setFoodEntryToUpdate(undefined)}
          foodEntry={foodEntryToUpdate}
          onFoodEntryUpdated={async () => {
            await execute();
            setFoodEntryToUpdate(undefined);
          }}
        />
      )}
      <Grid columns={2} style={{ paddingTop: 20 }}>
        <Grid.Column verticalAlign="middle">
          <Header size="huge">Admin dashboard</Header>
        </Grid.Column>
      </Grid>

      <Header>Food entries added per date:</Header>
      <AdminFoodEntryStatistics statistics={statistics || []} />

      <Header>Average calories over the last 7 days:</Header>
      {statistics && (
        <AdminAverageCalorieTable
          entries={statistics.averageCaloriesPerDay || []}
        />
      )}
      <Button
        floated="right"
        primary
        onClick={() => setShowNewFoodEntryModal(true)}
      >
        New food entry
      </Button>
      <Header>All food entries:</Header>
      <FoodEntryTable
        isAdmin
        entries={foodEntries || []}
        onDelete={(entry) => {
          wrappedDeleteFoodEntry(entry);
        }}
        onEditClick={(entry) => {
          setFoodEntryToUpdate(entry);
        }}
      />
    </Container>
  );
};
