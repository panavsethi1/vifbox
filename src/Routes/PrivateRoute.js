import React from "react";
import { Redirect, Route } from "react-router-dom";
// import { useStateValue } from "../Context/StateProvider";

function PrivateRoute({ component: Component, ...rest }) {
  // const [state, dispatch] = useStateValue();
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("auth_pass") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
