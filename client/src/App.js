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
import API from './utils/API';

class App extends Component {
  state = {
    id: null,
    first_name: null
  };

  componentDidMount() {
    API.verify()
      .then(res => this.setState(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Router>
        <>
        <Header name={this.state.first_name} />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/questionnaire" exact component={Questionnaire} user={this.state.id} favorites={this.state.favorites} />} />
          <Route path="/search" exact component={Search} user={this.state.id} favorites={this.state.favorites} />} />
          <Route path="/user" exact component={User} user={this.state.id} favorites={this.state.favorites} />} />
          <Route path="/secret" component={withAuth(Secret)}/>
          <Route path="/plant" exact component={PlantAdd} />
          <Route path="/register" exact render={props => <Register activeTab="register" />} />
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