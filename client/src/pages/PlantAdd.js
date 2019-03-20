import React, {Component} from "react";
import {Container, Row, Col} from "../components/Grid";
import {Input} from "../components/Form";
import {Btn} from "../components/Btn";
import API from "../utils/API";

class PlantAdd extends Component {
  state = {
    plant_id: "",
    common_name: null,
    scientific_name: "",
    image: null,
    height_mature_ft: null,
    shade_tolerance: null,
    moisture_use: null,
    growth_habit: null,
    flower_conspicuous: null,
    propogated_by_seed: null,
    palatable_human: null,
    lumber_product: null,
    nursery_stock_product: null,
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

    API.plantAdd({
      id: this.state.plant_id,
      common_name: this.state.common_name,
      scientific_name: this.state.scientific_name,
      image: this.state.image,

      height_mature_ft: this.state.height_mature_ft,
      shade_tolerance: this.state.shade_tolerance,
      moisture_use: this.state.moisture_use,
      
      growth_habit: this.state.growth_habit,
      flower_conspicuous: this.state.flower_conspicuous,
      propogated_by_seed: this.state.propogated_by_seed,
      palatable_human: this.state.palatable_human,
      lumber_product: this.state.lumber_product,
      nursery_stock_product: this.state.nursery_stock_product
    })
      .then(() => this.setState({status: "Successfully registered a plant!"}))
      .catch(err => this.setState({status: "Plant was not successfully registered. You may have a duplicate plant id."}));
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
              size="s6"
              name="plant_id"
              id="plantId"
              handleInputChange={this.handleInputChange}>
              Plant ID</Input>

            <Input
              size="s6"
              name="common_name"
              id="plantCommon"
              handleInputChange={this.handleInputChange}>
              Plant Common Name</Input>

            <Input
              size="s6"
              name="scientific_name"
              id="plantScience"
              handleInputChange={this.handleInputChange}>
              Plant Scientific Name</Input>

            <Input
              size="s6"
              name="image"
              id="plantImage"
              handleInputChange={this.handleInputChange}>
              Plant Image URL</Input>

            <Input
              size="s6"
              name="height_mature_ft"
              id="plantHeight"
              handleInputChange={this.handleInputChange}
              >Plant Height (ft)</Input>
              

            <Input
              size="s6"
              name="shade_tolerance"
              id="plantShade"
              handleInputChange={this.handleInputChange}
              >Plant Shade Tolerance</Input>
              

            <Input
              size="s6"
              name="moisture_use"
              id="plantMoisture"
              handleInputChange={this.handleInputChange}
              >Plant Moisture Use</Input>

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