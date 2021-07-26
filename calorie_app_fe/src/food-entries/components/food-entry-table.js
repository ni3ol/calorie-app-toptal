import React, { useState } from "react";
import { Table, Menu, Icon, Button, Form } from "semantic-ui-react";
import { format } from "date-fns";
import { updateFoodEntry } from "../actions/update-food-entry";
import { usePromiseLazy } from "src/utils";

const GetOrSetPrice = (foodEntryId, entryPrice) => {
  const [formVisible, setFormVisible] = useState(false);
  const [price, setPrice] = useState(entryPrice);

  const {
    execute: wrappedUpdateFoodEntry,
    error,
    isLoading,
  } = usePromiseLazy(async () => {
    const updatedFoodEntry = await updateFoodEntry({
      foodEntryId,
      price
    });

    return updatedFoodEntry;
  }, []);

  const handleSubmit = async () => {
    const { result: foodEntry } = await wrappedUpdateFoodEntry();
    setFormVisible(false);
  };

  return formVisible ? (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Price"
        placeholder="100"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Form.Button primary type="submit">
        {price ? "Edit" : "Set"} price
      </Form.Button>
    </Form>
  ) : (
    <>
      {price && price}
      <Button floated="right" onClick={() => setFormVisible(true)}>
        {price ? "Edit" : "Set"} Price
      </Button>
    </>
  );
};

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
          {/* <Table.HeaderCell>Actions</Table.HeaderCell> */}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{format(new Date(entry.createdAt), "PPpp")}</Table.Cell>
            <Table.Cell>{entry.name}</Table.Cell>
            <Table.Cell>{entry.calories}</Table.Cell>
            <Table.Cell>
              {format(new Date(entry.consumedAt), "PPpp")}
            </Table.Cell>
            <Table.Cell>{GetOrSetPrice(entry.id, entry.price)}</Table.Cell>
            {isAdmin && <Table.Cell>{entry.userId}</Table.Cell>}
            {/* <Table.Cell textAlign="right">
              <Button primary basic onClick={() => onEditClick(entry.id)}>
                Edit
              </Button>
              <Button color="red" basic>
                Delete
              </Button>
            </Table.Cell> */}
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
