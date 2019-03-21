import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Search from "./pages/Search";
import User from "./pages/User";
import Secret from "../src/Secret";

import withAuth from "./withAuth";

import PlantAdd from "./pages/PlantAdd";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      <Router>
        <>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/questionnaire" exact component={Questionnaire} />} />
          <Route path="/search" exact component={Search} />} />
          <Route path="/user" exact component={withAuth(User)} />} />
          <Route path="/secret" component={withAuth(Secret)}/>
          <Route path="/plant" exact component={PlantAdd} />
          <Route path="/Register" exact render={props => <Register activeTab="register" />} />
          <Route path="/login" exact render={props => <Register activeTab="login" />} />
          <Redirect from="/register#login" to="/login" />
          <Redirect from="/login#register" to="/register" />
        </Switch>
        </>
      </Router>
    );
  }
}

export default App;