import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AdminView } from "./admin/components/admin-view";
import { FoodEntryListView } from "./food-entries/components/food-entry-list-view";
import "react-datepicker/dist/react-datepicker.css";
import { ADMIN_USER_ID, USER_ID } from "./utils/user";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userIdToCheckAgainst = rest.path === "/admin" ? ADMIN_USER_ID : USER_ID;
  return (
    <Route
      {...rest}
      render={(props) =>
        rest.userId === userIdToCheckAgainst ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: rest.path === "/admin" ? "/" : "/admin" }} />
        )
      }
    />
  );
};

function App() {
  return (
    <Switch>
      <PrivateRoute
        exact
        path="/admin"
        component={AdminView}
        // change this value to check that user cannot login
        userId={ADMIN_USER_ID}
      />
      <PrivateRoute
        exact
        path="/"
        component={FoodEntryListView}
        // change this value to check that user cannot login
        userId={USER_ID}
      />
    </Switch>
  );
}

export default App;
