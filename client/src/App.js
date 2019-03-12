import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";

// import Home from "./pages/Home";
// import Questionnaire from "./pages/Questionnaire";
// import Search from "./pages/Search";
// import User from "./pages/User";

import HomeTest from "./Home";
import withAuth from "./withAuth";
import SecretTest from "./Secret";
import LoginTest from "./Login";

class App extends Component {
  render() {
    return (
      <Router>
        <>
        <Header />

        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          {/* <Route path="/questionnaire" exact component={Questionnaire} /> */}
          {/* <Route path="/search" exact component={Search} /> */}
          {/* <Route path="/user" exact component={User} /> */}

          <Route path="/" component={HomeTest} />
          <Route path="/secret" component={withAuth(SecretTest)} />
          <Route path="/login" component={LoginTest} />
        </Switch>
        </>
      </Router>
    );
  }
}

export default App;
