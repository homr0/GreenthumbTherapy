import React, { Component } from "react";
import { Btn } from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Input, Radio, Checkbox } from "../components/Form";
import PlantCard from "../components/PlantCard";

class Search extends Component {
  state = {
    plants: [],
    plant_type: "",
    plant_height: "none",
    plant_light: "adjustable",
    plant_water: "none"
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
    let query = {};

    // Translate type of plant to query.
    switch (this.state.plant_type) {
      case "flower":
        query.flower_conspicuous = true;
        query.propogated_by_seed = true;
        break;
      case "edible":
        query.palatable_human = true;
        query.propogated_by_seed = true;
        break;
      case "succulent":
        query.moisture_use = "Low";
        break;
      case "tree":
        query.lumber_product = true;
        query.growth_habit = "Tree";
        query.nursery_stock_product = true;
        break;
      case "shrub":
        query.growth_habit = "Shrub";
        query.nursery_stock_product = true;
        break;
      default:
    }

    //Plant Height
    if (this.state.plant_height !== "none")
      query.height_mature_ft = this.state.plant_height;

    //Plant Shade
    if (this.state.plant_light !== "adjustable")
      query.shade_tolerance = this.state.plant_light;

    //Plant Water
    if (this.state.plant_water !== "none")
      query.moisture_use = this.state.plant_water;

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
                <h2 className="center">Plant Search</h2>
              </ListHeader>

              <Input
                onChange={this.handleInputChange}
                name="plant_name"
                placeholder="Search Plant Name"
              >
                Insert Plant Name
              </Input>

              <Input
                onChange={this.handleInputChange}
                name="plant_height"
                placeholder="Number in inches"
                type="number"
              >
                Height in inches{" "}
              </Input>

              <ListItem>
                {/* <Row>
                    <Col> */}
                Type of plant:
                {[
                  { value: "flower", label: "Flower" },
                  { value: "edible", label: "Edible" },
                  { value: "succulent", label: "Succulent/Cactus" },
                  { value: "tree", label: "Tree" },
                  { value: "shrub", label: "Shrub" }
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
                {/* <Select
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
                      </Select> */}
                {/* </Col>
                </Row> */}
              </ListItem>

              <ListItem>
                {/* <Row>
                  <Col> */}
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
                {/* </Col>
                </Row> */}
              </ListItem>

              <ListItem>
                {/* <Row>
                  <Col> */}
                Precipitation Needed:
                {[
                  { value: "dry", label: "Dry" },
                  { value: "temperate", label: "Temperate" },
                  { value: "humid", label: "Humid" },
                  { value: "adjustable", label: "Adjustable" }
                ].map(plant => (
                  <Radio
                    name="weather_space"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Radio>
                ))}
                {/* </Col>
                </Row> */}
              </ListItem>

              <ListItem>
                {/* <Row>
                  <Col> */}
                Temperature needed to grow:
                {[
                  { value: "45", label: "Cold (<45F)" },
                  { value: "60", label: " Warm (45-74F)" },
                  { value: "75", label: " Hot (>75F)" },
                  { value: "adjustable", label: "Adjustable" }
                ].map(plant => (
                  <Radio
                    name="space_climate"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Radio>
                ))}
                {/* </Col>
                </Row> */}
              </ListItem>

              <ListItem>
                {/* <Row>
                  <Col> */}
                Safe to consume for:
                {[
                  { value: "humans", label: "Human" },
                  { value: "animals", label: "Animal" }
                ].map(plant => (
                  <Checkbox
                    name="plant_consume"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Checkbox>
                ))}
                {/* </Col>
                </Row> */}
              </ListItem>

              <ListItem>
                {/* <Row>
                  <Col> */}
                Allergies:
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ].map(plant => (
                  <Radio
                    name="plant_allergy"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Radio>
                ))}
                {/* </Col>
                </Row> */}
              </ListItem>

              <ListItem>
                <Btn handleClickEvent={this.handleFormSubmit}>
                  Show Me Plants
                </Btn>
              </ListItem>
            </List>
          </Col>
        </Row>

        
        <Row>
          <Col>
            <h1>Results</h1>
            <Row id="plant-results">
              {this.state.plants.map(plant => (
                <PlantCard
                  key={plant.id}
                  id={plant.id}
                  common_name={plant.common_name}
                  scientific_name={plant.scientific_name}
                />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Search;
