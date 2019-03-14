import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";

class Home extends Component {
  state = {
    plant: []
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="s12 m4 center plant-box">
            <h2>
              <Link to="/questionnaire">Plant Matcher</Link>
            </h2>
          </Col>

          <Col size="s12 m4 center plant-box">
            <h2>
              <Link to="/search">Search Plants</Link>
            </h2>
          </Col>

          <Col size="s12 m4 center plant-box">
            <h2>
              <Link to="/user">User Page</Link>
            </h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;