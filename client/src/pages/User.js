import React, { Component } from "react";
import {withRouter} from "react-router-dom";
// import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
// import { Input } from "../components/Form";
import PlantCard from "../components/PlantCard";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
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
          user: res.data.id
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

    //Calling Login to validate email and password from API
    API.login({
      email: this.state.email,
      password: this.state.password
    });

  }

  render() {
    return (
      <Container>
        {/* <Row>
          <Col size="m6">
            <form>
              <Input
                name="email" type="email" id="email"
                handleInputChange={this.handleInputChange}
                size="s6">Email
              </Input>

              <Input
                name="password" type="password" id="password"
                  handleInputChange={this.handleInputChange}
                  size="s6">Password
              </Input>
              <Btn handleClickEvent={this.handleFormSubmit}>Update Password</Btn>
            </form>
          </Col>
      </Row> */}

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
  )};
}
export default withRouter(User);