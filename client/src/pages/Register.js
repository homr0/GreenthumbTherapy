
import React, { Component } from 'react';
import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Input } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import Tabs from "../components/Tabs"

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      register_email: "",
      register_password: "",
      register_first_name: "",
      register_last_name: "",
      register_message: "Please fill in the information to create your account.",
      register_status: 200,

      login_email: "",
      login_password: "",
      login_message: "Please type in the email and password for your account.",
      login_status: 200,

      activeTab: props.activeTab
    };
  };

  componentDidMount() {
    setTimeout(() => (document.getElementById("register").style.display === document.getElementById("login").style.display) && window.location.reload(), 1);
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
  
    API.register({
      email: this.state.register_email,
      password: this.state.register_password,
      first_name: this.state.register_first_name,
      last_name: this.state.register_last_name
    })
    .then(res => {
      this.setState({
      register_status: res.status,
      register_message: res.data.message
    })})
    .catch(err => this.setState({
      register_status: 500,
      register_message: "Internal server error!"
    }));
  }

  handleLogin = e => {
    e.preventDefault();

    API.login({
      email: this.state.login_email,
      password: this.state.login_password,
    })
    .then(res => this.setState({
      login_message: res.data.message,
      login_status: res.status
    }))
    .catch(err => this.setState({
        status: 500,
        login_message: "Internal server error!"
      })
    );
  }

  render() {
    return(
      <Container>
        <Tabs tabs={[
          {link: "register", label: "Register"},
          {link: "login", label: "Login"}
        ]} activeTab={this.state.activeTab}>
          <Col id="register">
            <form>
              <Row>
                <Input
                  size="s6"
                  name="register_first_name"
                  id="register_first_name"
                  handleInputChange={this.handleInputChange}
                  >First Name</Input>

                  <Input
                    size="s6"
                    name="register_last_name"
                    id="register_last_name"
                    handleInputChange={this.handleInputChange}
                    >Last Name</Input>
              </Row>

              <Row>
                <Input
                  size="s6"
                  name="register_email"
                  type="email"
                  id="register_email"
                  handleInputChange={this.handleInputChange}
                  >Email</Input>

                  <Input
                    size="s6"
                    name="register_password"
                    type="password"
                    id="register_password"
                    handleInputChange={this.handleInputChange}
                    >Password</Input>
              </Row>

              <Btn handleClickEvent={this.handleFormSubmit}>Register User</Btn>

              <p className={(this.state.register_status === 200) ? "green-text" : "red-text"}>{this.state.register_message}</p>
            </form>
          </Col>

          <Col id="login">
          <form>
              <Input
                size="s6"
                name="login_email"
                type="email"
                id="login_email"
                handleInputChange={this.handleInputChange}
                >Email</Input>

                <Input
                  size="s6"
                  name="login_password"
                  type="password"
                  id="login_password"
                  handleInputChange={this.handleInputChange}
                  >Password</Input>

                  <Btn handleClickEvent={this.handleLogin}>Login User</Btn>

                  <p className={(this.state.login_status === 200) ? "green-text" : "red-text"}>{this.state.login_message}</p>
              </form>
          </Col>
        </Tabs>
      </Container>
    );
  }
}

  