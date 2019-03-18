import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import Search from "./pages/Search";
import User from "./pages/User";

// import HomeTest from "./Home";
// import withAuth from "./withAuth";
// import SecretTest from "./Secret";
// import LoginTest from "./Login";

import PlantAdd from "./pages/PlantAdd";
import Register from "./pages/register";

class App extends Component {
  render() {
    return (
      <Router>
        <>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/questionnaire" exact component={Questionnaire} />
          <Route path="/search" exact component={Search} />
          <Route path="/user" exact component={User} /> 

          {/* <Route path="/" exact component={HomeTest} />
          <Route path="/secret" exact component={withAuth(SecretTest)} />
          <Route path="/login" exact component={LoginTest} /> */}
          <Route path="/plant" exact component={PlantAdd} />
          <Route path="/register" exact component={Register} />
        </Switch>
        </>
      </Router>
    );
  }
};

export default App;
