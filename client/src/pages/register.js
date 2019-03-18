import React, { Component } from 'react';
import {Btn}  from "../components/Btn";
import { Input } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import API from '../utils/API';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
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
        <Row>
          <Col>
            <h1>Register Below!</h1>

            <form>
              <Row>
                <Input
                  size="s6"
                  name="first_name"
                  id="first_name"
                  handleInputChange={this.handleInputChange}
                >First Name</Input>

                <Input
                  size="s6"
                  name="last_name"
                  id="last_name"
                  handleInputChange={this.handleInputChange}
                >Last Name</Input>
              </Row>

              <Row>
                <Input
                  size="s6"
                  name="email"
                  type="email"
                  id="email"
                  handleInputChange={this.handleInputChange}
                  >Email</Input>

                  <Input
                    size="s6"
                    name="password"
                    type="password"
                    id="password"
                    handleInputChange={this.handleInputChange}
                    >Password</Input>
              </Row>
              
              <Btn handleClickEvent={this.onSubmit}>Sign Up!</Btn>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

  