import React, { Component } from "react";
import {Btn} from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem, ListHeader } from "../components/List";
import { Radio, Switch, Checkbox } from "../components/Form";
import PlantCard from "../components/PlantCard";


class Questionnaire extends Component {
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
      plant_water: "none",

      plant_pets: [],
      plant_location: [],
      save_preferences: false,
      plant_allergy: false
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

        API.getPreferences(res.data.id)
        .then(response => {
          this.setState(response.data);

          // Parse answers into the form.
          this.state.plant_location.map(place => document.querySelectorAll("[name=plant_location][value=" + place + "]")[0].checked = true);

          document.querySelectorAll("[name=plant_light][value=" + this.state.plant_light + "]")[0].checked = true;
          document.querySelectorAll("[name=plant_water][value=" + this.state.plant_water + "]")[0].checked = true;
          
          this.state.plant_pets.map(pet => document.querySelectorAll("[name=plant_pets][value=" + pet + "]")[0].checked = true);

          document.querySelectorAll("[name=plant_allergy][value=" + this.state.plant_allergy + "]")[0].checked = true;
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
        plants.map(plant => plant.banned = banned.includes(id));

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

    if(target.type === "checkbox") {
      let answers = this.state[name];
      (value) ? answers.push(target.value) : answers.splice(answers.indexOf(target.value), 1);

      this.setState({
        [name]: answers
      });
    } else {
      this.setState({
        [name]: value
      })
    }
  };

  handleFormSubmit = event => {
    event.preventDefault();

    let query = {};

    // Translate type of plant to query.
    switch(this.state.plant_type) {
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
    };

    //Plant Height
    if(this.state.plant_height !== "none") query.height_mature_ft = this.state.plant_height;

    //Plant Shade
    if(this.state.plant_light !== "adjustable") query.shade_tolerance = this.state.plant_light;


    //Plant Water
    if(this.state.plant_water !== "none" ) query.moisture_use = this.state.plant_water;

    // Load plants
    this.loadPlants(query);

    (this.state.save_preferences) && API.setPreferences(this.state.user, {
      preferred_room: this.state.plant_location,
      preferred_sunlight: this.state.plant_light,
      preferred_water: this.state.plant_water,
      pets: this.state.plant_pets,
      allergy: this.state.plant_allergy
    })
      .then(res => console.log("Sucessfully saved preferences"))
      .catch(err => console.log(err));
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
                <p>1. What type of plant appeals to you?</p>

                {[
                  { value: "flower", label: "Flower" },
                  { value: "edible", label: "Edible" },
                  { value: "succulent", label: "Succulent/Cactus" },
                  { value: "tree", label: "Tree" },
                  { value: "shrub", label: "Shrub" },
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
                <p>2. Where will your plant be located?</p>

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
              </ListItem>

              <ListItem>
                <p>3. How big do you want your plant to be?</p>

                {[
                  { value: "1", label: "Tiny (< 1foot)" },
                  { value: "2", label: "Small (2-5feet)" },
                  { value: "3", label: "Medium (6-9feet)" },
                  { value: "4", label: "Large (> 10feet)" },
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
              </ListItem>

              <ListItem>
                <p>4. How much sunlight does your space get during the day?</p>
                  
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
              </ListItem>

              
              <ListItem>
                 <p>5. How often would you like to water your plant?</p>
                 
                 {[
                    { value: "High", label: "Daily" },
                    { value: "Medium", label: "Every few days" },
                    { value: "Low", label: "Weekly" },
                    { value: "none", label: "No preference" },
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
              </ListItem>

              <ListItem>
                <p>6. What kind of pets do you have?</p>
                    
                {[
                  { value: "dog", label: "Dog" },
                  { value: "cat", label: "Cat" },
                  { value: "rabbit", label: "Rabbit" },
                  { value: "ferret", label: "Ferret" },
                  { value: "bird", label: "Bird" },
                ].map(plant => (
                  <Checkbox
                    key={"plant_pets=" + plant.value}
                    name="plant_pets"
                    value={plant.value}
                    handleInputChange={this.handleInputChange}
                  >
                    {plant.label}
                  </Checkbox>
                ))}
              </ListItem>

              <ListItem>
                <p>7. Do you have an allergy to pollen?</p>

                <Switch name="plant_allergy2" onLabel="Yes" offLabel="No" />
                    
                {/* {[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ].map(plant => (
                  <Radio
                    key={"plant_allergy=" + plant.value}
                    name="plant_allergy"
                    value={plant.value}
                    handleInputChange={this.handleInputChange}
                  >
                    {plant.label}
                  </Radio> */}
                {/* ))} */}
              </ListItem>

               <ListItem>
                <Btn handleClickEvent={this.handleFormSubmit}>Show Me Plants</Btn>

                <p>Save Preferences: </p>
                {[
                  { value: true, label: "Yes" },
                  { value: false, label: "No" },
                ].map(plant => (
                  <Radio
                    key={"save_preferences=" + plant.value}
                    name="save_preferences"
                    value={plant.value}
                    handleInputChange={this.handleInputChange}
                  >
                    {plant.label}
                  </Radio>
                ))}
              </ListItem>

            </List>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* <h1>Your Plant Matches</h1> */}

            <Row id="plant-results">
              {this.state.plants.map(plant => 
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
              )}
            </Row>
          </Col>
        </Row>
        
      </Container>
    );
  }
}

export default Questionnaire;
