import React, { Component } from "react";
import { Btn } from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Input, Radio, Checkbox } from "../components/Form";
import PlantCard from "../components/PlantCard";

class Search extends Component {
  state = {
    user: null,
    favorites: [],

    plants: [],
    plant_type: "",
    plant_height: "none",
    plant_light: "adjustable",
    plant_water: "none"
  };

  componentDidMount() {
    // Load the user id into the state.
    API.checkToken()
      .then(res => {
        this.setState({user: res.data.id});

        // Loads the user's favorite plant list into the component.
        API.viewFavorites(this.state.user)
          .then(data => this.setState({favorites: data}))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  loadPlants = query => {
    API.searchPlants(query)
      .then(res => this.setState({ plants: res.data }))
      .catch(err => console.log(err));
  };

  favoritePlant = id => {
    API.addFavorite(this.state.user, id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  unfavoritePlant = id => {
    API.removeFavorite(this.state.user, id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

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
                size="s6"
                name="plant_name"
                placeholder="Search Plant Name"
              >
                Insert Plant Name
              </Input>
              

              
              <Input
                onChange={this.handleInputChange}
                name="plant_height"
                size="s6"
                placeholder="Number in feet"
                type="number"
                min="1"
                max="20"
              >
                Height in feet{" "}
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
                  { value: "intolerant", label: " Full Sunlight" },
                  { value: "intermediate", label: " Some Sunlight" },
                  { value: "tolerant", label: " Full Shade" },
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
                <Btn handleClickEvent={this.handleFormSubmit} colors="teal darken-3">
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
                  image={plant.image}
                  handleSaveEvent={() => this.favoritePlant(plant.id)}
                  handleDeleteEvent={() => this.unfavoritePlant(plant.id)}
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
