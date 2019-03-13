import React, { Component } from "react";
import {Btn} from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Input, Radio, Checkbox } from "../components/Form";

class Questionnaire extends Component {
  state = {
    plants: []
  };

  componentDidMount() {
    this.loadPlants();
  }

  loadPlants = () => {
    API.searchPlants()
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
            <List>
              <ListHeader>
                <h2>Plant Matcher</h2>
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
                        name="plant_type"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                        name="plant_location"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                      { value: "1", label: " Tiny (&lt;12in)" },
                      { value: "2", label: " Small (12-24in)" },
                      { value: "3", label: "Medium (24-36in)" },
                      { value: "4", label: "Tree Large (&gt;36in)" },
                      { value: "none", label: "No Preference" }
                    ].map(plant => (
                      <Radio
                        name="plant_height"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                      { value: "intolerant", label: " A lot of sunlight" },
                      { value: "tolerant", label: " Not a lot of sunlight" },
                      { value: "adjustable", label: "Adjustable" }      
                    ].map(plant => (
                      <Radio
                        name="plant_light"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                      { value: "45", label: "FlowerCold (&gt;45F)" },
                      { value: "60", label: " Warm (45-74F)" },
                      { value: "75", label: " Hot (&gt;75F)" },
                      { value: "adjustable", label: "Adjustable" },   
                    ].map(plant => (
                      <Radio
                        name="space_climate"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                      { value: "dry", label: "Dry" },
                      { value: "temperate", label: "Temperate" },
                      { value: "humid", label: "Humid" },
                      { value: "adjustable", label: "Adjustable" },
                    ].map(plant => (
                      <Radio
                        name="weather_space"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                      { value: "daily", label: "Daily" },
                      { value: "few", label: "Every few days" },
                      { value: "weekly", label: "Weekly" },
                      { value: "low", label: "As little as possible" },
                    ].map(plant => (
                      <Radio
                        name="plant_water"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                        name="plant_pets"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
                        name="plant_allergy"
                        value={plant.value}
                        onChange={() => this.handleInputChange()}
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
