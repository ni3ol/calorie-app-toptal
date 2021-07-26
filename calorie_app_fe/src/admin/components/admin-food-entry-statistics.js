import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import { format } from "date-fns";

// Number of added entries in the last 7 days vs. added entries week before that.
// Please Include the current day in those stats
// Average number of calories added per user for last 7 days
// Regular user should not be able to access this reporting screen or access its
// data

export const AdminFoodEntryStatistics = ({ statistics }) => {
  return (
    <Grid columns="equal">
      <Grid.Row>
        <Grid.Column>
          <Segment>
            <Header>Entries added today</Header>
            <Header>{statistics.currentDayEntriesCount}</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header>Entries added over the last 7 days</Header>
            <Header>{statistics.lastWeekEntriesCount}</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header>Entries added two weeks ago</Header>
            <Header>{statistics.twoWeeksAgoEntriesCount}</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment>
            <Header>Average calories added per user over the last 7 days</Header>
            <Header>{statistics.lastWeekAverageCaloriesPerUserCount}</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
