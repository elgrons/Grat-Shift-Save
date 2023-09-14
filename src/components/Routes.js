import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import { history } from "./History";
import Login from "./Login";
import App from "./App";

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default Routes;