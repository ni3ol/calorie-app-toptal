import React, { useState } from "react";
import { Modal, Form, Message } from "semantic-ui-react";
import { usePromiseLazy } from "src/utils";
import { createFoodEntry } from "../actions/create-food-entry";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const NewFoodEntryModal = ({ onClose, onFoodEntryCreated }) => {
  const [name, setName] = useState();
  const [calories, setCalories] = useState();
  const [consumedAt, setConsumedAt] = useState(new Date());

  const {
    execute: wrappedCreateFoodEntry,
    error,
    isLoading,
  } = usePromiseLazy(async () => {
    const newFoodEntry = await createFoodEntry({
      name,
      calories,
      consumedAt,
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
          <p style={{fontSize: 13, marginBottom: 4, fontWeight: 700}}>Consumed at</p>
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
