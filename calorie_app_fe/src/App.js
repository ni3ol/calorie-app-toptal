import React from "react";
import { Switch, Route } from "react-router-dom";
import { AdminView } from "./admin/components/admin-view";
import { FoodEntryListView } from "./food-entries/components/food-entry-list-view";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={FoodEntryListView} />
      <Route exact path="/admin" component={AdminView} />
    </Switch>
  );
}

export default App;
