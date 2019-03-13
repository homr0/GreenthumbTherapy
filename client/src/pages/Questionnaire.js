import React, { Component } from "react";
import {Btn} from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Radio, Checkbox } from "../components/Form";

class Questionnaire extends Component {
  state = {
    plants: [],
    plant_type: "",
    plant_height: "none",
    plant_light: "adjustable",
    space_climate: "adjustable",
    weather_space: "adjustable",
    plant_water: "low"
  };

  componentDidMount() {
    // this.loadPlants();
  }

  loadPlants = query => {
    API.searchPlants(query)
      .then(res => {
        console.log(res.data);
        this.setState({ plants: res.data });
      })
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

    // let query="&nursery_stock_product=true";
    let query = {
      nursery_stock_product: true
    }

    // Translate type of plant to query.
    switch(this.state.plant_type) {
      case "flower":
        // query += "&flower_conspicuous=true";
        query.flower_conspicuous = true;
        break;
      case "edible":
        // query += "&palatable_human=true";
        query.palatable_human = true;
        break;
      case "succulent":
        // query += "&moisture_use=Low";
        query.moisture_use = "Low";
        break;
      case "tree":
        // query += "&lumber_product=true&growth_habit=Tree";
        query.lumber_product = true;
        query.growth_habit = "Tree";
        break;
      case "shrub":
        // query += "&growth_habit=Shrub"
        query.growth_habit = "Shrub";
        break;
      default:
    };

    //Plant Height
    // if(this.state.plant_height !== "none") query += ("&height_mature_ft=" + this.state.plant_height);

    //Plant Shade
    // if(this.state.plant_light !== "adjustable") query += ("&shade_tolerance=" + this.state.plant_light);

    //Space Climate
    // if(this.state.space_climate !== "adjustable") query += ("&temperature_minimum_deg_f=" + this.state.space_climate);

    //Weather Space
    // if(this.state.weather_space !== "adjustable") query += ("&precipitation_minimum=" + this.state.weather_space);

    //Plant Water
    // if(this.state.plant_water !=="low" ) query += ("&moisture_use=" + this.state.plant_water);
    

    //Plant Pets

    // Load plants
    this.loadPlants(query);
  };


  render() {
    return (
      <Container>
        <Row>
          <Col>
            <List>
              <ListHeader>
                <h2 className="center">Plant Matcher</h2>
              </ListHeader>

              <ListItem>
                <Row>
                  <Col>
                    1. What type of plant appeals to you?
                    {[
                      { value: "flower", label: "Flower" },
                      { value: "edible", label: "Edible" },
                      { value: "succulent", label: "Succulent/Cactus" },
                      { value: "tree", label: "Tree" },
                      { value: "shrub", label: "Shrub" },
                      { value: "none", label: "None" }
                    ].map(plant => (
                      <Radio
                        key={"plant_type=" + plant.value}
                        name="plant_type"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    2. Where will your plant be located?
                    {[
                      { value: "bedroom", label: "Bedroom" },
                      { value: "office", label: "Office" },
                      { value: "kitchen", label: "Kitchen" },
                      { value: "bathroom", label: "Bathroom" },
                      { value: "livingroom", label: "Living Room" },
                      { value: "frontyard", label: "Front Yard" },
                      { value: "backyard", label: "Backyard" }
                    ].map(plant => (
                      <Checkbox
                        key={"plant_location=" + plant.value}
                        name="plant_location"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Checkbox>
                    ))}
                    </Col>
                    </Row>
                    </ListItem>
              <ListItem>
                <Row>
                  <Col>
                    3. How big do you want your plant to be?
                    {[
                      { value: "1", label: "Tiny (< 12in)" },
                      { value: "2", label: "Small (12-24in)" },
                      { value: "3", label: "Medium (24-36in)" },
                      { value: "4", label: "Tree Large (> 36in)" },
                      { value: "none", label: "No Preference" }
                    ].map(plant => (
                      <Radio
                        key={"plant_height=" + plant.value}
                        name="plant_height"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}                  
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                  4.  How much sunlight does your space get during the day?
                    {[
                      { value: "Intolerant", label: " A lot of sunlight" },
                      { value: "Intermediate", label: "Some sunlight" },
                      { value: "Tolerant", label: " Not a lot of sunlight" },
                      { value: "adjustable", label: "Adjustable" }      
                    ].map(plant => (
                      <Radio
                        key={"plant_light=" + plant.value}
                        name="plant_light"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                   5.  What is the average climate of your space?
                   {[
                      { value: "-43", label: "Cold(< 45F)" },
                      { value: "-23", label: "Warm (45-74F)" },
                      { value: "50", label: "Hot (> 75F)" },
                      { value: "adjustable", label: "Adjustable" },   
                    ].map(plant => (
                      <Radio
                        key={"space_climate=" + plant.value}
                        name="space_climate"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                  6.  Which best describes the weather condition of your space?
                 {[
                      { value: "12", label: "Dry" },
                      { value: "24", label: "Temperate" },
                      { value: "36", label: "Humid" },
                      { value: "adjustable", label: "Adjustable" },
                    ].map(plant => (
                      <Radio
                        key={"weather_space=" + plant.value}
                        name="weather_space"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                 7.  How often would you like to water your plant?
                 {[
                      { value: "High", label: "Daily" },
                      { value: "Medium", label: "Every few days" },
                      { value: "Low", label: "Weekly" },
                      { value: "low", label: "As little as possible" },
                    ].map(plant => (
                      <Radio
                        key={"plant_water=" + plant.value}
                        name="plant_water"
                        value={plant.value}
                        handleInputChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}                 
                      
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    8.  What kind of pets do you have?
                    {[
                      { value: "dog", label: "Dog" },
                      { value: "cat", label: "Cat" },
                      { value: "rodent", label: "Rodent" },
                      { value: "rabbit", label: "Rabbit" },
                      { value: "ferret", label: "Ferret" },
                      { value: "bird", label: "Bird" },
                      { value: "reptile", label: "Reptile" },
                      { value: "fish", label: "Fish" },
                    ].map(plant => (
                      <Checkbox
                        key={"plant_pets=" + plant.value}
                        name="plant_pets"
                        value={plant.value}
                        onChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Checkbox>
                    ))}
                   
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                    9.  Do you have an allergy to pollen?
                    {[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ].map(plant => (
                      <Radio
                        key={"plant_allergy=" + plant.value}
                        name="plant_allergy"
                        value={plant.value}
                        onChange={this.handleInputChange}
                      >
                        {plant.label}
                      </Radio>
                    ))}         
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

            {/* {this.state.plants.map(plant => (
              <PlantCard name={plant.name} image={plant.image} />
            ))} */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Questionnaire;
