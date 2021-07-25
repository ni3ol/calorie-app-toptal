import React, { useState } from "react";
import { Button, Modal, Form, Message } from "semantic-ui-react";
import { usePromiseLazy } from "src/utils";
import { createFoodEntry } from "../actions/create-food-entry";

export const UpdateFoodEntryModal = ({ onClose, onFoodEntryUpdated, foodEntry }) => {
  const [name, setName] = useState();
  const [calories, setCalories] = useState();
  const [consumedAt, setConsumedAt] = useState();
  const [price, setPrice] = useState();

  const {
    execute: wrappedUpdateFoodEntry,
    error,
    isLoading,
  } = usePromiseLazy(async () => {
    console.log("Updating food entry");
  }, []);

  const handleSubmit = async () => {
    const { result: foodEntry } = await wrappedUpdateFoodEntry();

    if (foodEntry && onFoodEntryUpdated) {
      await onFoodEntryUpdated(foodEntry);
    }
  };

  return (
    <Modal closeIcon size="small" onClose={() => onClose(false)} open>
      <Modal.Header>Update food entry</Modal.Header>
      <Modal.Content>
        {error && (
          <Message color="red">
            Failed to update food entry. {JSON.stringify(error)}
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Food"
            placeholder="Banana"
            onChange={(e) => setName(e.target.value)}
            value={foodEntry.name}
          />
          <Form.Input
            label="Calories"
            placeholder="100"
            onChange={(e) => setCalories(e.target.value)}
            value={foodEntry.calories}
          />
          <Form.Input
            label="Consumed at"
            placeholder="2021/08/21"
            onChange={(e) => setConsumedAt(e.target.value)}
            value={foodEntry.consumedAt}
          />
          <Form.Input
            label="Price"
            placeholder="100"
            onChange={(e) => setPrice(e.target.value)}
            value={foodEntry.price}
          />
          <Form.Button primary type="submit" loading={isLoading}>
            Update food entry
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
