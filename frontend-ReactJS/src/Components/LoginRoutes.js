import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { Login } from "../Components/LoginAndRegistration/Login";
import { Registration } from "../Components/LoginAndRegistration/Registration";
import { ForgotPassword } from "../Components/LoginAndRegistration/ForgotPassword";
import { ForgotPasswordCode } from "../Components/LoginAndRegistration/ForgotPasswordCode";
import { SetNewPassword } from "../Components/LoginAndRegistration/SetNewPassword";

export const LoginRoutes = () => (
  <Router>
    <Switch>
      <Route exact path="/register" component={Registration}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/forgotPassword" component={ForgotPassword}></Route>
      <Route
        exact
        path="/forgotPassword/code"
        component={ForgotPasswordCode}
      ></Route>
      <Route
        exact
        path="/forgotPassword/:id/newPassword"
        component={SetNewPassword}
      ></Route>
    </Switch>
    <Redirect to="/login" />
  </Router>
);
