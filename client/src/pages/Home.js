import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import {Slider, SliderItem} from "../components/Slider";


class Home extends Component {
  state = {
    plant: []
  };

  componentDidMount() {
    setTimeout(() => (!document.getElementsByClassName("slider")[0].style.height) && window.location.reload(), 1);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Slider>
              <SliderItem image="images/flower1.jpeg" caption="Take our quiz to find the plant that is right for you!">
                <Link to="/questionnaire"><h3 className="left-align">Plant Matcher</h3></Link>
              </SliderItem>
              <SliderItem image="images/flower2.jpeg" caption="Looking for the right plant?">
                <Link to="/search"><h3>Search Plants</h3></Link>
              </SliderItem>
              <SliderItem image="images/flower3.jpeg" caption="Do these belong to you?">
                <Link to="/user"><h3 className="left-align">User Page</h3></Link>
              </SliderItem>
            </Slider>
          </Col>
        </Row>

        <Row id="planter-box">
          <Col size="s12 m4 center plant-box">
            <h2>
              <a href="/questionnaire" className="teal-text text-darken-2">Plant Matcher</a>
            </h2>

            <p>Don't know where to start? Take our quiz to find the plant that is right for you!</p>
          </Col>

          <Col size="s12 m4 center plant-box">
            <h2>
              <a href="/search" className="teal-text text-darken-2">Search Plants</a>
            </h2>

            <p>Have an idea of the plant you want? Use our search engine to find the plant you're looking for.</p>
          </Col>

          <Col size="s12 m4 center plant-box">
            <h2>
              <a href="/user" className="teal-text text-darken-2">User Planter</a>
            </h2>

            <p>Already a member of Greenthumb Therapy? Manage your plants, whether you love them or can't stand them.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;