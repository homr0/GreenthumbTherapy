import React, { Component } from "react";
import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";

class User extends Component {
  state = {
    email: null,
    password: null
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    //Calling Login test to validatge email and password from API
    API.loginTest({
      email: this.state.email,
      password: this.state.password
    }); 

  }

  render() {
    return (
      <Container>
        <Row>
          <Col size="m6">
            <form>
              <Input
                name="email" type="email" id="email"
                handleInputChange={this.handleInputChange}
                size="s6">Email
              </Input>

              <Input
                name="password" type="password" id="password"
                  handleInputChange={this.handleInputChange}
                  size="s6">Password
              </Input>
              <Btn handleClickEvent={this.handleFormSubmit}>Update Password</Btn>
            </form>
          </Col>
      </Row>

      <Row>
        <Col size="s12 m4">
          <h6 className="center">Favorites</h6>
        </Col>

        <Col size="s12 m4">
          <h6 className="center">Favorite Space Info</h6>
        </Col>

        <Col size="s12 m4">
          <h6 className="center">No Go Plants</h6>
        </Col>
      </Row>
    </Container>
  )};
}
export default User;




