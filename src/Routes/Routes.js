import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../pre-login/Login";
import SignUp from "../pre-login/SignUp";
import ForgetPassword from "../pre-login/ForgetPassword";
import SentForgetPassword from "../pre-login/SentForgetPassword";
import NewPassword from "../pre-login/NewPassword";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard";
import Upgrade from "../Pages/Upgrade";
import VerifyEmail from "../pre-login/VerifyEmail";
import PersonalInformation from "../Pages/PersonalInformation";
import CompanyInformation from "../Pages/CompanyInformation";
import GeneralInformation from "../Pages/GeneralInformation";
import ChangePassword from "../Pages/ChangePassword";
import AccountSecurity from "../Pages/AccountSecurity";

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
      <Route exact path="/verify-email" component={VerifyEmail} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute
        exact
        path="/profile/personal-information"
        component={PersonalInformation}
      />
      <PrivateRoute
        exact
        path="/profile/company-information"
        component={CompanyInformation}
      />
      <PrivateRoute
        exact
        path="/profile/general-information"
        component={GeneralInformation}
      />
      <PrivateRoute
        exact
        path="/profile/change-password"
        component={ChangePassword}
      />
      <PrivateRoute
        exact
        path="/profile/account-security"
        component={AccountSecurity}
      />
      <PrivateRoute exact path="/upgrade" component={Upgrade} />
    </Switch>
  );
};

export default Routes;
