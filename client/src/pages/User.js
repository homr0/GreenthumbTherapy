import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";
import Tabs from "../components/Tabs";
import {List, ListItem} from "../components/List";
import PlantCard from "../components/PlantCard";
import profile from "../components/PlantCard/placeholder.png"

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      first_name: null,
      last_name: "User",
      favorites: [],
      banned: [],

      plant_location: [],
      plant_pets: [],

      email: null,
      password: null,
      password_status: ""
    };
  };

  componentDidMount() {
    API.verify()
      .then(res => {
        this.setState({
          user: res.data.id,
          first_name: res.data.first_name,
          last_name: res.data.last_name
        });

        this.viewFavoritePlants();
        this.viewPreferences();
        this.viewBannedPlants();

        setTimeout(() => (document.getElementById("favorites").style.display === document.getElementById("banned").style.display) && window.location.reload(), 1);
      })
      .catch(() => this.props.history.push("/login"));
  }

  viewFavoritePlants = () => {
    API.viewFavorites(this.state.user)
      .then(res => this.setState({favorites: res.data}))
      .catch(err => console.log(err));
  }

  unfavoritePlant = id => {
    API.removeFavorite(this.state.user, id)
      .then(() => this.viewFavoritePlants())
      .catch(err => console.log(err));
  }

  viewPreferences = () => {
    API.getPreferences(this.state.user)
      .then(res => {
        this.setState(res.data);
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }

  viewBannedPlants = () => {
    API.viewBanned(this.state.user)
      .then(res => this.setState({banned: res.data}))
      .catch(err => console.log(err));
  }

  unBanPlant = id => {
    API.removeBanned(this.state.user)
      .then(() => this.viewBannedPlants())
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

    API.updatePassword({
      id: this.state.user,
      password: this.state.password,
      new_password: this.state.new_password
    })
      .then(res => this.setState({
        password_status: res.data.message
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h2 className="center">{this.state.first_name} {this.state.last_name}'s Planter</h2>
          </Col>
        </Row>

        <Row id="profile">
          <Col size="s12 m3 offset-m1">
            <img className="profile-img" src={(this.state.favorites.length > 0) ? this.state.favorites[0].image : profile} alt="Plant profile"/>
          </Col>

          <Col size="s12 profile-card m8">
            <List>
              <ListItem>
                <strong>Primary Plant Locations: </strong>{(this.state.plant_location.length > 0) ? this.state.plant_location.join(", ") : "N/A"}
              </ListItem>

              <ListItem>
                <strong>Average Sunlight: </strong>{((this.state.plant_light === "Intolerant") && <span><i className="fas fa-sun"></i> Full Sun</span>)
                  || ((this.state.plant_light === "Intermediate") && <span><i className="fas fa-cloud-sun"></i> Partial Sun</span>)
                  || ((this.state.plant_light === "Tolerant") && <span><i className="fas fa-cloud"></i> Shade</span>)
                  || "N/A"}
              </ListItem>

              <ListItem>
                <strong>Average Watering Frequency: </strong>{(this.state.plant_water !== "none") ? this.state.plant_water : "N/A"}
              </ListItem>

              <ListItem>
                <strong>Pets to Consider: </strong>{(this.state.plant_pets.length > 0) ? this.state.plant_pets.join(", ") : "None"}
              </ListItem>

              <ListItem>
                <strong>Allergies?: </strong>{this.state.plant_allergy ? "Yes" : "No"}
              </ListItem>
            </List>
            
            <form>
              <Input
                name="password" type="password" id="password"
                handleInputChange={this.handleInputChange}
                size="s12">Current Password
              </Input>

              <Input
                name="new_password" type="password" id="new_password"
                  handleInputChange={this.handleInputChange}
                  size="s12">New Password
              </Input>
              <Btn handleClickEvent={this.handleFormSubmit}>Update Password</Btn>
            </form>

            <p>{this.state.password_status}</p>
          </Col>
        </Row>

        <Tabs tabs={[
          {link: "favorites", label: "Favorite Plants List"},
          {link: "banned", label: "Banned Plants List"}
        ]} fixed_width={true}>
          <Col id="favorites">
            {(this.state.favorites.length > 0) ? this.state.favorites.map(plant => <PlantCard
                key={plant.id}
                size="s12 m4"
                id={plant.id}
                common_name={plant.common_name}
                scientific_name={plant.scientific_name}
                image={plant.image}
                shade_tolerance={plant.shade_tolerance}
                favorite={true}
                userFav={true}
                handleDeleteEvent={() => this.unfavoritePlant(plant.id)} />) : <p className="center">You currently have no favorite plants.</p>}
          </Col>

          <Col id="banned">
            {(this.state.banned.length > 0) ? this.state.banned.map(plant => <PlantCard
                key={plant.id}
                size="s12 m4"
                id={plant.id}
                common_name={plant.common_name}
                scientific_name={plant.scientific_name}
                image={plant.image}
                shade_tolerance={plant.shade_tolerance}
                banned={true}
                userBan={true}
                handleUnBanEvent={() => this.unBanPlant(plant.id)} />) : <p className="center">You currently have no banned plants.</p>}
          </Col>
        </Tabs>
      </Container>
    )
  };
}
export default withRouter(User);