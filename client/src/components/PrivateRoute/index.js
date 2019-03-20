import React, {Component} from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import API from "../../utils/API";

const PrivateRoute = ({component: Component, ...rest}) => 
  <Route {...rest} render={(props) => (
    API.checkToken()
      .then(<Component {...props} />)
      .catch(<Redirect to="/register" />)
  )} />