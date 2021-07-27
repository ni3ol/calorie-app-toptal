import React from "react";
import { Table } from "semantic-ui-react";
import { format } from "date-fns";

export const AdminAverageCalorieTable = ({ entries }) => {
  const days = Object.entries(entries);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Average calories consumed</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {days.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{format(new Date(entry[0]), "PP")}</Table.Cell>
            <Table.Cell>{entry[1]}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
