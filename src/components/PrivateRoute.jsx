import React from "react";
import { Route, Redirect } from "react-router-dom";
import {useUser} from "../contexts/UserContext"

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const {user} = useUser()
    const userRole = useUser.is_vendor
    console.log(userRole);
    

  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default PrivateRoute;
