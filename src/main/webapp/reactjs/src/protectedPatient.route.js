import React from "react";
import { Route, Redirect } from "react-router-dom";
import authService from "./services/auth.service";

export const ProtectedPatient = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (authService.getCurrentUser().roles[0] === 'ROLE_PATIENT') {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          );
        }
      }}
    />
  );
};