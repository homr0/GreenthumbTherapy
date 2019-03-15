import React, { Component } from "react";
import {Btn} from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Input, Radio, Checkbox, Select} from "../components/Form";

class Search extends Component {
  state = {
    plants: []
  };

  componentDidMount() {
    // this.loadPlants();
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
                <h2>Plant Search</h2>
              </ListHeader>

            
              <Input
                onChange={this.handleInputChange}
                name="plant_name"
                placeholder="Search Plant Name"
              >Insert Plant Name</Input>

              <Input
                onChange={this.handleInputChange}
                name="plant_height"
                placeholder="Number in inches"
                type="number"
              >Height in inches </Input>
              
              
                <ListItem>
                  <Row>
                    <Col>
                    
                      <Select
                        name="plant_type"
                        options={[
                          { value: "flower", label: "Flower" },
                          { value: "edible", label: "Edible" },
                          { value: "succulent", label: "Succulent/Cactus" },
                          { value: "tree", label: "Tree" },
                          { value: "shrub", label: "Shrub" },
                        ]}
                        onChange={this.handleInputChange}
                      >Type of Plant:
                      </Select>
                  </Col>
                </Row>
              </ListItem>

              <ListItem>
                <Row>
                  <Col>
                 Sunlight needed:
                    {[
                      { value: "intolerant", label: " A lot of sunlight" },
                      { value: "intermediate", label: " Some sunlight" },
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
                 Precipitation Needed:
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
                  Temperature needed to grow:
                   {[
                      { value: "45", label: "Cold (<45F)" },
                      { value: "60", label: " Warm (45-74F)" },
                      { value: "75", label: " Hot (>75F)" },
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
                   Safe to consume for:
                    {[
                      { value: "humans", label: "Human" },
                      { value: "animals", label: "Animal"},
                    ].map(plant => (
                      <Checkbox
                        name="plant_consume"
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
                   Allergies:
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
            <h1>Results</h1>
            {/* {this.state.plants.map(plant => (
              <PlantCard name={plant.name} image={plant.image} />
            ))} */}
          </Col>
        </Row>

     
      </Container>

    );
  }
}
export default Search;
