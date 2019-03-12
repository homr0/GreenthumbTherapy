import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Route, Switch } from "react-router-dom";
import withAuth from "./withAuth";
import Secret from "./Secret";
import Login from "./Login";

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/"></Link></li>
          <li><Link to="/"></Link></li>
          <li><Link to="/"></Link></li>
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
