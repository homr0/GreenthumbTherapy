import React, { Component } from "react";
import Btn from "../components/Btn";
import Nav from "../components/Nav";
import Header from "../components/Header";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, Radio, Checkbox } from "../components/Form";

class Questionnaire extends Component {
  state = {
    plants: []
  };

  componentDidMount() {
    this.loadPlants();
  }

  loadPlants = () => {
    API.getPlants()
      .then(res => this.setState({ plants: res.data }))
      .catch(err => console.log(err));
  };

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

    let query="&nursery_stock_product=true";

    // Translate type of plant to query.
    switch(this.state.plant_type) {
      case "flower":
        query += "&flower_conspicuous=true";
        break;
      case "edible":
        query += "&palatable_human=true";
        break;
      case "succulent":
        query += "&moisture_use=low";
        break;
      case "tree":
        query += "&lumber_product=true";
        break;
      case "shrub":
        query += "&growth_habit=shrub"
    };

    //Plant Height
    if(this.state.plant_height !== "none") query += ("&height_mature_ft=" + this.state.plant_height);

    //Plant Shade
    if(this.state.plant_light !== "adjustable") query += ("&shade_tolerance=" + this.state.plant_light);

    //Space Climate
    if(this.state.space_climate !== "adjustable") query += ("&temperature_minimum_deg_f=" + this.state.space_climate);

    //Weather Space
    if(this.state.weather_space !== "adjustable") query += ("&precipitation_minimum=" + this.state.weather_space);
    

    //Plant Water
    if(this.state.plant_water !=="low" ) query += ("&moisture_use=" + this.state.plant_water);
    

    //Plant Pets
    
    








    API.searchPlants(query);

    if (this.state.title && this.state.author) {
      API.savePlant({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadPlants())
        .catch(err => console.log(err));
    }
  };


  render() {
    return (
      <Container>
        <Row>
          <Col>
            <p>Plant Matcher</p>

            <List list="ol">
              <ListItem>
                <Row>
                  <Col>
                    What type of plant appeals to you?
                    {[
                      { value: "flower", label: "Flower" },
                      { value: "edible", label: "Edible" },
                      { value: "succulent", label: "Succulent/Cactus" },
                      { value: "tree", label: "Tree" },
                      { value: "shrub", label: "Shrub" },
                      { value: "none", label: "None" }
                    ].map(plant => (
                      <Radio
                        name="plant_type"
                        value={plant.value}
                        onChange={() => handleInputChange()}
                      >
                        {plant.label}
                      </Radio>
                    ))}
                    {/* <Radio name="plant_type" value="flower">Flower</Radio><br />
                        <Radio name="plant_type" value="edible">Edible</Radio><br />
                        <Radio name="plant_type" value="succulent">Succulent/Cactus</Radio><br />
                        <Radio name="plant_type" value="tree">Tree</Radio><br />
                        <Radio name="plant_type" value="shrub">Shrub</Radio><br />
                        <Radio name="plant_type" value="none">No Preference</Radio> */}
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    Where will your plant be located?
                    <Checkbox name="plant_location" value="bedroom">
                      Bedroom
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_location" value="office">
                      Office
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_location" value="kitchen">
                      Kitchen
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_location" value="bathroom">
                      Bathroom
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_location" value="livingroom">
                      Living Room
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_location" value="front">
                      Front Yard
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_location" value="back">
                      Backyard
                    </Checkbox>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    How big do you want your plant to be?
                    <Radio name="plant_height" value="1">
                      Tiny (&lt;12in)
                    </Radio>
                    <br />
                    <Radio name="plant_height" value="2">
                      Small (12-24in)
                    </Radio>
                    <br />
                    <Radio name="plant_height" value="3">
                      Medium (24-36in)
                    </Radio>
                    <br />
                    <Radio name="plant_height" value="4">
                      Large (&gt;36in)
                    </Radio>
                    <br />
                    <Radio name="plant_height" value="none">
                      No Preference
                    </Radio>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    How much sunlight does your space get during the day?
                    <Radio name="plant_light" value="intolerant">
                      A lot of sunlight
                    </Radio>
                    <br />
                    <Radio name="plant_light" value="tolerant">
                      Not a lot of sunlight
                    </Radio>
                    <br />
                    <Radio name="plant_light" value="adjustable">
                      Adjustable
                    </Radio>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    What is the average climate of your space?
                    <Radio name="space_climate" value="45">
                      Cold (&gt;45F)
                    </Radio>
                    <br />
                    <Radio name="space_climate" value="60">
                      Warm (45-74F)
                    </Radio>
                    <br />
                    <Radio name="space_climate" value="75">
                      Hot (&gt;75F)
                    </Radio>
                    <br />
                    <Radio name="space_climate" value="adjustable">
                      Adjustable
                    </Radio>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    Which best describes the weather condition of your space?
                    <Radio name="weather_space" value="dry">
                      Dry
                    </Radio>
                    <br />
                    <Radio name="weather_space" value="temperate">
                      Temperate
                    </Radio>
                    <br />
                    <Radio name="weather_space" value="humid">
                      Humid
                    </Radio>
                    <br />
                    <Radio name="weather_space" value="adjustable">
                      Adjustable
                    </Radio>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    How often would you like to water your plant?
                    <Radio name="plant_water" value="daily">
                      Daily
                    </Radio>
                    <br />
                    <Radio name="plant_water" value="few">
                      Every few days
                    </Radio>
                    <br />
                    <Radio name="plant_water" value="weekly">
                      Weekly
                    </Radio>
                    <br />
                    <Radio name="plant_water" value="low">
                      As little as possible
                    </Radio>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    What kind of pets do you have?
                    <Checkbox name="plant_pets" value="dog">
                      Dog
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="cat">
                      Cat
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="rodent">
                      Rodent
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="rabbit">
                      Rabbit
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="ferret">
                      Ferret
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="bird">
                      Bird
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="reptile">
                      Reptile
                    </Checkbox>
                    <br />
                    <Checkbox name="plant_pets" value="fish">
                      Fish
                    </Checkbox>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    Do you have an allergy to pollen?
                    <Radio name="plant_allergy" value="yes">
                      Yes
                    </Radio>
                    <br />
                    <Radio name="plant_allergy" value="no">
                      No
                    </Radio>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Btn handleClickEvent={this.handleFormSubmit}>Show Me Plants</Btn>
              </ListItem>
            </List>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1>Your Plant Matches</h1>

            {this.state.plants.map(plant => (
              <PlantCard name={plant.name} image={plant.image} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Questionnaire;
