import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pre-login/Login";
import SignUp from "../pre-login/SignUp";
import ForgetPassword from "../pre-login/ForgetPassword";
import SentForgetPassword from "../pre-login/SentForgetPassword";
import NewPassword from "../pre-login/NewPassword";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/forget-password" component={ForgetPassword} />
      <Route
        exact
        path="/sent-forget-password"
        component={SentForgetPassword}
      />
      <Route exact path="/new-password" component={NewPassword} />
      <PrivateRoute exact path="/profile" component={Profile} />
    </Switch>
  );
};

export default Routes;
