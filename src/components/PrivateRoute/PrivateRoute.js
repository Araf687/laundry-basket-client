  
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({children,...rest}) => {
  console.log(children);
  const [loggedInUser,]=useContext(UserContext);
    return (
        <Route
      {...rest}
      render={({ location }) =>
      (loggedInUser.email || sessionStorage.getItem('user') ) ? (
           children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;