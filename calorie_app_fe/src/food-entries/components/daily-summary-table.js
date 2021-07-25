import React from "react";
import { Table } from "semantic-ui-react";

export const DailySummaryTable = ({ entries }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Calorie limit</Table.HeaderCell>
          <Table.HeaderCell>Calorie amount</Table.HeaderCell>
          <Table.HeaderCell>Calorie limit exceeded</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{entry.createdAt}</Table.Cell>
            <Table.Cell>{entry.calorieLimit}</Table.Cell>
            <Table.Cell>{entry.calorieAmount}</Table.Cell>
            <Table.Cell>
              {entry.calorieAmount > entry.calorieLimit ? "Yes" : "No"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
