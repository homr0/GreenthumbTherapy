import React, { Component } from "react";
import Btn from "../components/Btn";
import Nav from "../components/Nav";
import Header from "../components/Header";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { cpus } from "os";

class Home extends Component {
    state = {
        plant: []
    };

render() {
    return (
       <container fluid>
           <Row>
               <Col size="s12 m4">
               <h5>Plant Matcher</h5>
               </Col>
              <Col size="s12 m4">
               <h5>Search Plants</h5>
               </Col>
               <Col size="s12 m4">
               <h5>User Page</h5>
              </Col>
         </Row>
       </container>
    )
}
}

export default Home;