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
import { reactRoutes } from "../constants";

export const LoginRoutes = () => (
  <Router>
    <Switch>
      <Route exact path={reactRoutes.register} component={Registration}></Route>
      <Route exact path={reactRoutes.login} component={Login}></Route>
      <Route
        exact
        path={reactRoutes.forgotPassword}
        component={ForgotPassword}
      ></Route>
      <Route
        exact
        path={reactRoutes.forgotPasswordCode}
        component={ForgotPasswordCode}
      ></Route>
      <Route
        exact
        path="/forgotPassword/:id/newPassword"
        component={SetNewPassword}
      ></Route>
    </Switch>
    <Redirect to={reactRoutes.login} />
  </Router>
);
