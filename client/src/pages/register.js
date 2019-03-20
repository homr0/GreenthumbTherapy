import React, { Component } from 'react';
import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Input } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Tabs from "../components/Tabs"

export default class Register extends Component {
  state = {
    register_email: "",
    register_password: "",
    register_message: "",
    login_email: "",
    login_password: "",
    login_message: ""
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    // Modify this so that the email and password are sent to the API.
    console.log("Need to do something with the email and password.");
  
    API.registerTest({
      email: this.state.register_email,
      password: this.state.register_password
    })
    .then(res => this.setState({
      register_message: res.data
    }))
    .catch(err => this.setState({
      register_message: err.data
    }));
      

  }

  handleLogin = e => {
    e.preventDefault();

    API.loginTest({
      email: this.state.login_email,
      password: this.state.login_password,
    })
    .then(res => this.setState({
      login_message: res.data
    }))
    .catch(err => this.setState({
      login_message: err.data
    }));
     
  }

  onSubmit = event => {
    event.preventDefault();
    API.registerTest(JSON.stringify(this.state))
      .then(() => console.log("New user registered."))
      .catch(err => console.log("There was an error registering a new user."));
  };

  render() {
    return(
      <Container>
        <Tabs tabs={[
          {link: "register", label: "Register"},
          {link: "login", label: "Login"}
        ]}>
          <Col id="register">
            <form>
              <Input
                size="s6"
                name="register_email"
                type="email"
                id="register_email"
                handleInputChange={this.onChange}
                >Email</Input>

                <Input
                  size="s6"
                  name="register_password"
                  type="password"
                  id="register_password"
                  handleInputChange={this.onChange}
                  >Password</Input>

                  <Btn handleClickEvent={this.handleFormSubmit}>Register User</Btn>

                  <p>{this.state.register_message}</p>
            </form>
          </Col>

          <Col id="login">
          <form>
              <Input
                size="s6"
                name="login_email"
                type="email"
                id="login_email"
                handleInputChange={this.onChange}
                >Email</Input>

                <Input
                  size="s6"
                  name="login_password"
                  type="password"
                  id="login_password"
                  handleInputChange={this.onChange}
                  >Password</Input>

                  <Btn handleClickEvent={this.handleFormSubmit}>Login User</Btn>

                  <p>{this.state.login_message}</p>
              </form>
          </Col>
        </Tabs>
      </Container>
    );
  }
}

  