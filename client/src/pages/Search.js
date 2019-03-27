import React, { Component } from "react";
import { Btn } from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Input, Radio, Checkbox } from "../components/Form";
import PlantCard from "../components/PlantCard";


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      favorites: [],
      banned: [],
  
      plants: [],
      plant_type: "",
      plant_height: "none",
      plant_light: "adjustable",
      plant_water: "none"
    }
  };

  componentDidMount() {
    API.verify()
      .then(res => {
        API.checkFavorites(res.data.id)
          .then(response => {
            this.setState({
              user: res.data.id,
              favorites: response.data
            });
          })
          .catch(err => console.log(err));

        API.checkBanned(res.data.id)
        .then(response => this.setState({
            banned: response.data
          }))
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  loadPlants = query => {
    API.searchPlants(query)
      .then(res => {
        // eslint-disable-next-line
        res.data.map(plant => {
          plant.favorite = this.state.favorites.includes(plant.id);
          plant.banned = this.state.banned.includes(plant.id);
        });
        this.setState({ plants: res.data });
      })
      .catch(err => console.log(err));
  };

  favoritePlant = id => {
    API.addFavorite(this.state.user, id)
      .then(res => {
        let {favorites, plants} = this.state;
        favorites.push(id);
        plants.map(plant => plant.favorite = favorites.includes(plant.id));
        
        this.setState({
          favorites: favorites,
          plants: plants
        });
      })
      .catch(err => console.log(err));
  }

  unfavoritePlant = id => {
    API.removeFavorite(this.state.user, id)
      .then(res => {
        let {favorites, plants} = this.state;
        favorites.splice(favorites.indexOf(id), 1);
        plants.map(plant => plant.favorite = favorites.includes(plant.id));

        this.setState({
          favorites: favorites,
          plants: plants
        });
      })
      .catch(err => console.log(err));
  }

  banPlant = id => {
    API.addBanned(this.state.id, id)
      .then(res => {
        let {banned, plants} = this.state;
        banned.push(id);
        plants.map(plant => plant.banned = banned.includes(plant.id));

        this.setState({
          banned: banned,
          plants: plants
        });
      })
  }

  unBanPlant = id => {
    API.removeBanned(this.state.user, id)
      .then(res => {
        let {banned, plants} = this.state;
        banned.splice(banned.indexOf(id), 1);
        plants.map(plant => plant.banned = banned.includes(plant.id));

        this.setState({
          banned: banned,
          plants: plants
        });
      })
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
   


    let query = {};
    
    query.q= this.state.plant_name;

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
                handleInputChange={this.handleInputChange}
                size="s6"
                name="plant_name"
                placeholder="Search Plant Name"
              >
                Insert Plant Name
              </Input>
              

              
              <Input
                handleInputChange={this.handleInputChange}
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
              </ListItem>

              <ListItem>
                Sunlight needed:
                {[
                  { value: "intolerant", label: " Full Sunlight" },
                  { value: "intermediate", label: " Some Sunlight" },
                  { value: "tolerant", label: " Full Shade" },
                  { value: "adjustable", label: "Adjustable" }
                ].map(plant => (
                  <Radio
                    key={"plant_light=" + plant.value}
                    name="plant_light"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Radio>
                ))}
              </ListItem>

              

              <ListItem>
                Safe to consume for:
                {[
                  { value: "humans", label: "Human" },
                  { value: "animals", label: "Animal" }
                ].map(plant => (
                  <Checkbox
                    key={"plant_consume=" + plant.value}
                    name="plant_consume"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Checkbox>
                ))}
              </ListItem>

              <ListItem>
                Allergies:
                {[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ].map(plant => (
                  <Radio
                    key={"plant_allergy=" + plant.value}
                    name="plant_allergy"
                    value={plant.value}
                    onChange={() => this.handleInputChange()}
                  >
                    {plant.label}
                  </Radio>
                ))}
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
            <Row id="plant-results">
              {this.state.plants.map(plant => (
                <PlantCard 
                key={plant.id}
                id={plant.id}
                common_name={plant.common_name}
                scientific_name={plant.scientific_name}
                shade_tolerance={plant.shade_tolerance}
                image={plant.image}
                favorite={plant.favorite}
                banned={plant.banned}
                
                handleSaveEvent={() => this.favoritePlant(plant.id)}
                handleDeleteEvent={() => this.unfavoritePlant(plant.id)}
                handleBanEvent={() => this.banPlant(plant.id)}
                handleUnBanEvent={() => this.unBanPlant(plant.id)} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Search;
