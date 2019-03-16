import React, {Component} from "react";
import {Container, Row, Col} from "../components/Grid";
import {Input} from "../components/Form";
import {Btn} from "../components/Btn";
import API from "../utils/API";

class PlantAdd extends Component {
  state = {
    plant_id: "",
    common_name: "",
    scientific_name: "",
    image: "",
    status: "Register a plant!"
  }

  handleInputChange = event => {
    event.preventDefault();

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClickEvent = event => {
    event.preventDefault();

    console.log({
      id: this.state.plant_id,
      common_name: this.state.common_name,
      scientific_name: this.state.scientific_name,
      image: this.state.image
    })

    API.plantAddTest({
      id: this.state.plant_id,
      common_name: this.state.common_name,
      scientific_name: this.state.scientific_name,
      image: this.state.image
    })
      .then(() => this.setState({status: "Successfully registered a plant!"}))
      .catch(err => this.setState({status: "Plant was not successfully registered."}));
  }

  render() {
    return(
      <Container>
        <Row>
          <Col>
            <h1>Plant Adding Form</h1>

            <p>{this.state.status}</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Input 
              name="plant_id"
              id="plantId"
              handleInputChange={this.handleInputChange}>
              Plant ID</Input>

            <Input
              name="common_name"
              id="plantCommon"
              handleInputChange={this.handleInputChange}>
              Plant Common Name</Input>

            <Input
              name="scientific_name"
              id="plantScience"
              handleInputChange={this.handleInputChange}>
              Plant Scientific Name</Input>

            <Input
              name="image"
              id="plantImage"
              handleInputChange={this.handleInputChange}>
              Plant Image URL</Input>

            <Btn handleClickEvent={this.handleClickEvent}>
              Submit a Plant
            </Btn>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PlantAdd;