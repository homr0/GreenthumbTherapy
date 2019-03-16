import React, { Component } from "react";
import {Btn}  from "../components/Btn";
// import Nav from "../components/Nav";
// import Header from "../components/Header";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input } from "../components/Form";
// import { userInfo } from "os";

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
      this.LoginTest(); 

  }


   render() {
       return (
       <Container fluid>
       <Row>
       <Col size="md-6">
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
           <Btn
                 //  
                   onClick={this.handleFormSubmit}
                  >
                   Update Password
           </Btn>

           </form>
       </Col>
       </Row>

       <Row>
       <Col size="md-6">
           <h6>Favorite</h6>
           </Col>
           <Col size="md-6">
               <h6>Favorite Space Info</h6>
               </Col>
               <Col size="md-6">
               <h6>No Go Plants</h6>
           </Col>
       </Row>
       </Container>
       )}
}
export default User;




