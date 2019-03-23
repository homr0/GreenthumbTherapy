import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {Btn}  from "../components/Btn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";
import PlantCard from "../components/PlantCard";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      favorites: [],

      email: null,
      password: null
    };
  };

  componentDidMount() {
    API.verify()
      .then(res => {
        this.setState({
          user: res.data.id,
          favorites: res.data.favorites
        });
      })
      .catch(err => {
        this.props.history.push("/login");
        console.log(err)
      });
  }

  viewFavoritePlants = () => {
    API.viewFavorites(this.state.user)
      .then(res => this.setState({favorites: res.data.plants}))
      .catch(err => console.log(err));
  }

  unfavoritePlant = id => {
    API.removeFavorite(this.state.user, id)
      .then(() => this.viewFavoritePlants())
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

    //Calling Login test to validate email and password from API
    API.loginTest({
      email: this.state.email,
      password: this.state.password
    });

  }

  render() {
    return (
      <Container>
        <Row>
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
            favorite={true}
            handleDeleteEvent={() => this.unfavoritePlant(plant._id)} />) : <p className="center">You currently have no favorite plants.</p>}
        </Col>

        <Col size="s12 m4">
          <h3 className="center">Favorite Space Info</h3>
        </Col>

        <Col size="s12 m4">
          <h3 className="center">No Go Plants</h3>
        </Col>
      </Row>
    </Container>
  )};
}
export default withRouter(User);