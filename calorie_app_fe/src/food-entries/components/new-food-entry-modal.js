import React, { useState } from "react";
import { Modal, Form, Message } from "semantic-ui-react";
import { usePromiseLazy } from "src/utils";
import { createFoodEntry } from "../actions/create-food-entry";
import DatePicker from "react-datepicker";

export const NewFoodEntryModal = ({ onClose, onFoodEntryCreated }) => {
  const [name, setName] = useState();
  const [calories, setCalories] = useState();
  const [consumedAt, setConsumedAt] = useState(new Date());
  const [isNameErrored, setIsNameErrored] = useState(false);
  const [isCaloriesErrored, setIsCaloriesErrored] = useState(false);

  const {
    execute: wrappedCreateFoodEntry,
    error,
    isLoading,
  } = usePromiseLazy(async () => {
    const newFoodEntry = await createFoodEntry({
      name,
      calories,
      consumedAt,
      price: 0,
    });

    return newFoodEntry;
  }, []);

  const handleSubmit = async () => {
    const nameErrored = name === undefined || name === "";
    if (nameErrored) setIsNameErrored(true);

    const numCalories = Number.parseInt(calories);
    const caloriesErrored = calories === undefined || numCalories <= 0;
    if (caloriesErrored) setIsCaloriesErrored(true);

    if (!caloriesErrored && !nameErrored) {
      const { result: foodEntry } = await wrappedCreateFoodEntry();

      if (foodEntry && onFoodEntryCreated) {
        await onFoodEntryCreated(foodEntry);
      }
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
            onChange={(e) => {
              setIsNameErrored(false);
              setName(e.target.value);
            }}
            error={
              isNameErrored && {
                content: "Please enter a valid food name",
                pointing: "below",
              }
            }
          />
          <Form.Input
            label="Calories"
            placeholder="100"
            type="number"
            onChange={(e) => {
              setIsCaloriesErrored(false);
              setCalories(e.target.value);
            }}
            error={
              isCaloriesErrored && {
                content: "Please enter a calorie amount",
                pointing: "below",
              }
            }
          />
          <p style={{ fontSize: 13, marginBottom: 4, fontWeight: 700 }}>
            Consumed at
          </p>
          <div style={{ width: "100%", marginBottom: 20 }}>
            <DatePicker
              className={{ width: "100%", marginBottom: 20 }}
              selected={consumedAt}
              onChange={(date) => setConsumedAt(date)}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>
          <Form.Button primary type="submit" loading={isLoading}>
            Create food entry
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
