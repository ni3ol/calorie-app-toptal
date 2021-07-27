import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { getDailySummaries } from "src/daily-summaries/actions/get-daily-summaries";
import { getUser } from "src/users/actions/get-user";
import { usePromise } from "src/utils";
import { getCalorieLimit } from "../actions/get-calorie-limit";
import { getFoodEntries } from "../actions/get-food-entries";
import { getMonthlySpendSummary } from "../actions/get-monthly-spend-summary";
import { DailySummaryTable } from "./daily-summary-table";
import { FoodEntryTable } from "./food-entry-table";
import { MonthlySpendSummaryTable } from "./monthly-spend-summary-table";
import { NewFoodEntryModal } from "./new-food-entry-modal";
import { UpdateFoodEntryModal } from "./update-food-entry-modal";
import DatePicker from "react-datepicker";
import { isAfter, isBefore } from "date-fns";
import { USER_ID } from "src/utils/user";

export const FoodEntryListView = () => {
  const [showNewFoodEntryModal, setShowNewFoodEntryModal] = useState(false);
  const [foodEntryIdToUpdate, setFoodEntryIdToUpdate] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { result: user } = usePromise(async () => {
    const user = await getUser();
    return user;
  }, []);

  const { result: dailySummaries } = usePromise(async () => {
    const dailySummaries = await getDailySummaries();
    return dailySummaries;
  }, []);

  const { result: foodEntries, execute } = usePromise(async () => {
    const foodEntries = await getFoodEntries({ user_id: USER_ID});
    return foodEntries;
  }, []);

  const { result: calorieLimit } = usePromise(async () => {
    const calorieLimit = await getCalorieLimit();
    return calorieLimit;
  }, []);

  const { result: monthlySpendSummary } = usePromise(async () => {
    const monthlySpendSummary = await getMonthlySpendSummary();
    return monthlySpendSummary;
  }, []);

  const foodEntryToUpdate = foodEntries?.find(
    (foodEntry) => foodEntry.id === foodEntryIdToUpdate
  );

  return (
    <>
      {showNewFoodEntryModal && (
        <NewFoodEntryModal
          onClose={() => setShowNewFoodEntryModal(false)}
          onFoodEntryCreated={() => {
            execute();
            setShowNewFoodEntryModal(false);
          }}
        />
      )}
      {foodEntryIdToUpdate && foodEntryToUpdate && (
        <UpdateFoodEntryModal
          onClose={() => {
            setFoodEntryIdToUpdate(undefined);
          }}
          foodEntry={foodEntryToUpdate}
          onFoodEntryUpdated={() => {
            execute();
          }}
        />
      )}
      <Container style={{ marginTop: 30 }}>
        {user?.isAdmin && <Link to="/admin">Go to admin page</Link>}
        <Grid columns={2}>
          <Grid.Column verticalAlign="middle">
            <Header size="huge">Food entries</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button primary onClick={() => setShowNewFoodEntryModal(true)}>
              New food entry
            </Button>
          </Grid.Column>
        </Grid>

        <Header>Filter by consumed at date:</Header>
        <Segment
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            From{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />{" "}
          </div>
          <div>
            to{" "}
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />{" "}
          </div>
          <div>
            <Button
              onClick={() => {
                setEndDate(undefined);
                setStartDate(undefined);
              }}
            >
              Clear filters
            </Button>
          </div>
        </Segment>

        <FoodEntryTable
          entries={(foodEntries || [])
            .filter((entry) => {
              return startDate
                ? isAfter(new Date(entry.consumedAt), new Date(startDate))
                : true;
            })
            .filter((entry) => {
              return endDate
                ? isBefore(new Date(entry.consumedAt), new Date(endDate))
                : true;
            })}
          onEditClick={(foodEntryId) => {
            setFoodEntryIdToUpdate(foodEntryId);
          }}
        />

        <Grid columns={2}>
          <Grid.Column verticalAlign="middle">
            <Header>Monthly summary</Header>
          </Grid.Column>
        </Grid>
        <MonthlySpendSummaryTable entry={monthlySpendSummary || []} />

        <Grid columns={2}>
          <Grid.Column verticalAlign="middle">
            <Header>Daily summaries</Header>
          </Grid.Column>
        </Grid>
        <p>
          Calorie limit: <b>{calorieLimit}</b>
        </p>
        <DailySummaryTable summary={dailySummaries || []} />
      </Container>
    </>
  );
};
