import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

class User extends Component {
  state = {
    plant: []
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="s12 m4 center plant-box">
            <h2>
              <Link to="/Register">Sign Up!</Link>
            </h2>
          </Col>

          <Col size="s12 m4 center plant-box">
            <h2>
              <Link to="/Login">Sign In!</Link>
            </h2>
          </Col>

        </Row>
      </Container>
    );
  }
}

export default User;



