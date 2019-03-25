import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";
import PlantCard from "../components/PlantCard";
import profile from "../components/PlantCard/placeholder.png"

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      first_name: null,
      favorites: [],
      banned: [],

      plant_location: [],
      plant_pets: [],

      email: null,
      password: null
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
      })
      .catch(err => {
        this.props.history.push("/login");
        console.log(err)
      });
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
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container>
        <Row id="profile">
          <Col size="s6">
            <h2>{this.state.first_name} {this.state.last_name}</h2>
            
            <form>
              <Input
                name="password" type="password" id="password"
                handleInputChange={this.handleInputChange}
                size="s12">Old Password
              </Input>

              <Input
                name="new_password" type="password" id="new_password"
                  handleInputChange={this.handleInputChange}
                  size="s12">New Password
              </Input>
              <Btn handleClickEvent={this.handleFormSubmit}>Update Password</Btn>
            </form>
          </Col>

          <Col size="s4 offset-s2">
            <img className="profile-img" src={(this.state.favorites.length > 0) ? this.state.favorites[0].image : profile} alt="Plant profile"/>
          </Col>
        </Row>

        <Row>
          <Col size="s12 m4">
            <h3 className="center">Favorites</h3>

            {(this.state.favorites.length > 0) ? this.state.favorites.map(plant => <PlantCard
              key={plant.id}
              size="s12"
              id={plant.id}
              common_name={plant.common_name}
              scientific_name={plant.scientific_name}
              image={plant.image}
              shade_tolerance={plant.shade_tolerance}
              favorite={true}
              userFav={true}
              handleDeleteEvent={() => this.unfavoritePlant(plant.id)} />) : <p className="center">You currently have no favorite plants.</p>}
          </Col>

          <Col size="s12 m4">
            <h3 className="center">Preferred Environment</h3>

            <p><strong>Primary Plant Locations: </strong>{this.state.plant_location.join(", ")}</p>

            <p><strong>Average Shade Tolerance: </strong>{this.state.plant_light}</p>

            <p><strong>Average Watering Frequency: </strong>{this.state.plant_water}</p>

            <p><strong>Pets to Consider: </strong>{this.state.plant_pets.join(", ")}</p>

            <p><strong>Allergies?: {this.state.plant_allergy ? "Yes" : "No"}</strong></p>
          </Col>

          <Col size="s12 m4">
            <h3 className="center">Banned Plants</h3>
            {(this.state.banned.length > 0) ? this.state.banned.map(plant => <PlantCard
              key={plant.id}
              size="s12"
              id={plant.id}
              common_name={plant.common_name}
              scientific_name={plant.scientific_name}
              image={plant.image}
              shade_tolerance={plant.shade_tolerance}
              banned={true}
              userBan={true}
              handleUnBanEvent={() => this.unBanPlant(plant.id)} />) : <p className="center">You currently have no banned plants.</p>}
          </Col>
        </Row>
      </Container>
    )
  };
}
export default withRouter(User);