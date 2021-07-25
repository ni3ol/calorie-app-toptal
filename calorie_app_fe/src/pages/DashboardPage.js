import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Icon,
  Label,
  Menu,
  Table,
  Header,
  Button,
  Segment,
  Input,
  Checkbox,
} from "semantic-ui-react";
import { signOut } from "../ducks/auth";
import { Link } from "react-router-dom";
import { FoodTable } from "../food-entries/components/food-entry-table";
import { FoodModal } from "../food-entries/components/new-food-entry-modal";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const isToday = (someDate) => {
  const today = new Date();
  return (
    someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
  );
};

export default function DashboardPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [entries, setEntries] = useState([]);
  const [monthlySpendLimit, setMonthlySpendLimit] = useState();
  const [dailyCalorieLimit, setDailyCalorieLimit] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [onlyToday, setOnlyToday] = useState(true);
  const [filteredEntries, setFilteredEntries] = useState([]);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }

  useEffect(() => {
    async function getLimits() {
      try {
        const { data } = await axios.get("/count_limits", {
          headers: headers,
        });
        setMonthlySpendLimit(data.monthlySpendLimit);
        setDailyCalorieLimit(data.dailyCalorieLimit);
      } catch (error) {
        console.error(error);
      }
    }
    async function getEntries() {
      try {
        const { data } = await axios.get("/food", {
          headers: headers,
        });
        setEntries(data.entries);
        setFilteredEntries(
          data.entries.filter((entry) => isToday(new Date(entry.consumedAt)))
        );
        setMonthlySpendLimit(data.monthlySpendLimit);
        setDailyCalorieLimit(data.dailyCalorieLimit);
      } catch (error) {
        console.error(error);
      }
    }
    getEntries();
    getLimits()
  }, []);

  const getDailyCalories = () => {
    return entries.reduce((acc, cur) => {
      return acc + cur.calories;
    }, 0);
  };

  const getMonthlySpend = () => {
    return entries.reduce((acc, cur) => {
      return acc + cur.price;
    }, 0);
  };

  return (
    <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 50 }}>
      <Header as="h1">Calorie Tracker Dashboard</Header>
      <div>
        <Segment>
          <p>
            {getDailyCalories()}/{dailyCalorieLimit} daily calories consumed
          </p>
          <p>
            {getMonthlySpend()}/{monthlySpendLimit} monthly spend
          </p>
          <p>**Float this and Add entry button to the right</p>
          <p>** Show warning when either limit exceeded!</p>
        </Segment>
        <FoodModal text="Add new entry" />
      </div>
      <Segment>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />{" "}
        to{" "}
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />{" "}
        <Button primary disabled={onlyToday}>
          Apply filter
        </Button>
        <a
          onClick={() => {
            setOnlyToday(false);
            setEndDate(undefined);
            setStartDate(undefined);
          }}
        >
          Clear filters
        </a>
        <br />
        <Checkbox
          checked={onlyToday}
          onChange={() => {
            setOnlyToday(!onlyToday);
          }}
          label="Only show today"
        />
      </Segment>
      <p>{onlyToday ? filteredEntries.length : entries.length} entries</p>
      {entries && <FoodTable entries={onlyToday ? filteredEntries : entries} />}
    </div>
  );
}
