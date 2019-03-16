import React, { Component } from "react";
import {Btn}  from "../components/Btn";
// import Nav from "../components/Nav";
// import Header from "../components/Header";
// import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
import { Input } from "../components/Form";
// import { userInfo } from "os";

class User extends Component {


   render() {
       return (
       <Container fluid>
       <Row>
       <Col size="md-6">
       <form>
           <Input
            name="email" type="email" id="email"
             handleInputChange = event => {
               Const email = target.email;
                this.setState({
                  [email]: value
                });
              }
            
              handleFormSubmit = event => {
                event.preventDefault()
              }
             size="s6">Email
            </Input>
           <Input
              name="password" type="password" id="password"
               handleInputChange={this.function}
               size="s6">Password
            </Input>
           <Btn
                 //  disabled={!(this.state.author && this.state.title)}
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




