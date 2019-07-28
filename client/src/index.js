import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TeamDetails } from "./components";
import Login from "./pages/Login";
import Teams from "./pages/Teams";
import Event from "./pages/Event";
import "typeface-roboto";

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/teams" exact component={Teams} />
        <Route path="/teams/:id" exact component={TeamDetails} />
        <Route path="/teams/:id/events/:eventId" exact component={Event} />
        <Route component={Login} />
      </Switch>
    </Router>
  );
}

export default AppRouter;

ReactDOM.render(<AppRouter />, document.getElementById("root"));
