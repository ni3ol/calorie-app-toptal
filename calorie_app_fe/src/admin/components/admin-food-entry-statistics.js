import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";

export const AdminFoodEntryStatistics = ({ statistics }) => {
  return (
    <Grid columns="equal">
      <Grid.Row>
      <Grid.Column>
          <Segment style={{textAlign: 'center'}}>
            <Header>2 weeks ago</Header>
            <Header>{statistics.towWeeksAgoDateRange}</Header>
            <Header size="huge">{statistics.twoWeeksAgoEntriesCount}</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment style={{textAlign: 'center'}}>
            <Header>Today</Header>
            <Header>{statistics.currentDate}</Header>
            <Header size="huge">{statistics.currentDayEntriesCount}</Header>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment style={{textAlign: 'center'}}>
            <Header>Last week</Header>
            <Header>{statistics.lastWeekDateRange}</Header>
            <Header size="huge">{statistics.lastWeekEntriesCount}</Header>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
