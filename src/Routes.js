import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Data from "./containers/Data";
import { Chart } from "react-stockcharts";


export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path={'/signup'} exact component={Signup} />
    <Route path={'/data'} exact component={Data} />
    <Route path={'/chart'} exact component={Chart} />
    { /* Finally, catch all unmatched routes */ }
	  <Route component={NotFound} />
  </Switch>;
