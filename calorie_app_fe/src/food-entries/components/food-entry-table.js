import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "semantic-ui-react";
import { format } from "date-fns";
import { updateFoodEntryPrice } from "../actions/update-food-entry-price";
import { usePromiseLazy } from "src/utils";

const GetOrSetPrice = ({ foodEntryId, entryPrice }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [price, setPrice] = useState(entryPrice);

  useEffect(() => {
    setPrice(entryPrice);
  }, [entryPrice]);

  const { execute: wrappedUpdateFoodEntry } = usePromiseLazy(async () => {
    const updatedFoodEntry = await updateFoodEntryPrice({
      foodEntryId,
      price,
    });

    return updatedFoodEntry;
  }, []);

  const handleSubmit = async () => {
    await wrappedUpdateFoodEntry();
    setFormVisible(false);
  };

  return formVisible ? (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        label="Price"
        placeholder="100"
        value={price}
        type="number"
        onChange={(e) => setPrice(e.target.value)}
      />
      <Form.Button primary type="submit">
        Set price
      </Form.Button>
    </Form>
  ) : (
    <>
      $ {price || entryPrice}
      <Button color="teal" basic floated="right" icon="edit" onClick={() => setFormVisible(true)}/>
    </>
  );
};

export const FoodEntryTable = ({ isAdmin, entries, onEditClick, onDelete }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Created at</Table.HeaderCell>
          <Table.HeaderCell>Updated at</Table.HeaderCell>
          <Table.HeaderCell>Food</Table.HeaderCell>
          <Table.HeaderCell>Calories</Table.HeaderCell>
          <Table.HeaderCell>Consumed at</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          {isAdmin && (
            <>
              <Table.HeaderCell>User ID</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{format(new Date(entry.createdAt), "PPpp")}</Table.Cell>
            <Table.Cell>{format(new Date(entry.updatedAt), "PPpp")}</Table.Cell>
            <Table.Cell>{entry.name}</Table.Cell>
            <Table.Cell>{entry.calories}</Table.Cell>
            <Table.Cell>
              {format(new Date(entry.consumedAt), "PPpp")}
            </Table.Cell>
            <Table.Cell>
              <GetOrSetPrice entryPrice={entry.price} foodEntryId={entry.id} />
            </Table.Cell>
            {isAdmin && (
              <>
                <Table.Cell>{entry.userId}</Table.Cell>
                <Table.Cell>
                  <Button size="small" color="teal" onClick={() => onEditClick(entry)}>
                    Update
                  </Button>
                  <Button size="small" color="red" onClick={() => onDelete(entry)}>
                    Delete
                  </Button>
                </Table.Cell>
              </>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
