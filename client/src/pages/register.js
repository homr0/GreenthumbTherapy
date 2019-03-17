import React, { Component } from "react";
import {Btn}  from "../components/Btn";
import { Input } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";

export default class Register extends Component {
  state = {
    email: "",
    password: ""
  }

  onChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    // Modify this so that the email and password are sent to the API.
    console.log("Need to do something with the email and password.");
  }

  render() {
    return(
      <Container>
        <Row>
          <Col>
            <form>
              <Input
                size="s6"
                name="email"
                type="email"
                id="email"
                handleInputChange={this.onChange}
                >Email</Input>

                <Input
                  size="s6"
                  name="password"
                  type="password"
                  id="password"
                  handleInputChange={this.onChange}
                  >Password</Input>

                  <Btn handleClickEvent={this.handleFormSubmit}>Update Password</Btn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}