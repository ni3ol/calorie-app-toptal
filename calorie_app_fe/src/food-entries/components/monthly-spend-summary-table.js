import React from "react";
import { Table } from "semantic-ui-react";

export const MonthlySpendSummaryTable = ({ entry }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Monthly Spend Limit</Table.HeaderCell>
          <Table.HeaderCell>Spend Amount</Table.HeaderCell>
          <Table.HeaderCell>Spend limit exceeded</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>{entry.month}</Table.Cell>
          <Table.Cell>{entry.monthlySpendLimit}</Table.Cell>
          <Table.Cell>{entry.monthlySpendAmount}</Table.Cell>
          <Table.Cell>
            {entry.spendAmount > entry.monthlySpendLimit ? "Yes" : "No"}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
