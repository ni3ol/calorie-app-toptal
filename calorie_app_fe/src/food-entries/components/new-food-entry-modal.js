import React, { useState } from "react";
import { Button, Modal, Form, Message } from "semantic-ui-react";
import { usePromiseLazy } from "src/utils";
import { createFoodEntry } from "../actions/create-food-entry";

export const NewFoodEntryModal = ({ onClose, onFoodEntryCreated }) => {
  const [name, setName] = useState();
  const [calories, setCalories] = useState();
  const [consumedAt, setConsumedAt] = useState();
  const [price, setPrice] = useState();

  const {
    execute: wrappedCreateFoodEntry,
    error,
    isLoading,
  } = usePromiseLazy(async () => {
    const newFoodEntry = await createFoodEntry({
      name,
      calories,
      consumedAt,
      price: Number.parseFloat(price),
    });

    return newFoodEntry;
  }, []);

  const handleSubmit = async () => {
    const { result: foodEntry } = await wrappedCreateFoodEntry();

    if (foodEntry && onFoodEntryCreated) {
      await onFoodEntryCreated(foodEntry);
    }
  };

  return (
    <Modal closeIcon size="small" onClose={() => onClose(false)} open>
      <Modal.Header>New food entry</Modal.Header>
      <Modal.Content>
        {error && (
          <Message color="red">
            Failed to create food entry. {JSON.stringify(error)}
          </Message>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label="Food"
            placeholder="Banana"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            label="Calories"
            placeholder="100"
            onChange={(e) => setCalories(e.target.value)}
          />
          <Form.Input
            label="Consumed at"
            placeholder="2021/08/21"
            onChange={(e) => setConsumedAt(e.target.value)}
          />
          <Form.Input
            label="Price"
            placeholder="100"
            onChange={(e) => setPrice(e.target.value)}
          />
          <Form.Button primary type="submit" loading={isLoading}>
            Create food entry
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
