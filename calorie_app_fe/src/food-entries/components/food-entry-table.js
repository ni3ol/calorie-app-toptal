import React from "react";
import { Table, Menu, Icon, Button } from "semantic-ui-react";

export const FoodEntryTable = ({ isAdmin, entries, onEditClick }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Created at</Table.HeaderCell>
          <Table.HeaderCell>Food</Table.HeaderCell>
          <Table.HeaderCell>Calories</Table.HeaderCell>
          <Table.HeaderCell>Consumed at</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          {isAdmin && <Table.HeaderCell>User ID</Table.HeaderCell>}
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{entry.createdAt}</Table.Cell>
            <Table.Cell>{entry.name}</Table.Cell>
            <Table.Cell>{entry.calories}</Table.Cell>
            <Table.Cell>{entry.consumedAt}</Table.Cell>
            <Table.Cell>{entry.price}</Table.Cell>
            {isAdmin && <Table.Cell>{entry.userId}</Table.Cell>}
            <Table.Cell textAlign="right">
              <Button primary basic onClick={() => onEditClick(entry.id)}>
                Edit
              </Button>
              <Button color="red" basic>
                Delete
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan={isAdmin ? 7 : 6}>
            <Menu pagination>
              <Menu.Item as="a" icon>
                <Icon name="chevron left" />
              </Menu.Item>
              {[0, 1, 2].map((page) => (
                <Menu.Item active={page === 0} as="a">
                  {page + 1}
                </Menu.Item>
              ))}
              <Menu.Item as="a" icon>
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
