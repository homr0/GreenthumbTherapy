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
      </Container>
    );
  }
}

export default Home;