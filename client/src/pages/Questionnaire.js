import React, { Component } from "react";
import Btn from "../components/Btn";
import Nav from "../components/Nav";
import Header from "../components/Header";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Questionnaire extends Component {
    state = {
      plants: []
    };
  
    componentDidMount() {
      this.loadPlants();
    }
  
    loadPlants = () => {
      API.getPlants()
        .then(res => this.setState({ plants: res.data }))
        .catch(err => console.log(err));
    };
  
    render() {
      return (
        <Container>
          <Row>
            <Col size="md-6">
              <Header>
              </Header>
               Plant Matcher
                  <List list="ol">
                  <ListItem>
                      <Row>
                          <Col>                          
                           What type of plant appeals to you?
                          <input type="radio" name="plant" value="flower">Flower<br>
                          <input type="radio" name="plant" value="edible">Edible<br>
                          <input type="radio" name="plant" value="cactus">Succulent/Cactus</br>
                          <input type="radio" name="plant" value="tree">Tree<br>
                          <input type="radio" name="plant" value="shrub">Shrub<br>
                          <input type="radio" name="plant" value="none">No Preference</br>
                        </Col>
                        </Row>
                        </ListItem>

                        
                  <ListItem>
                      <Row>
                          <Col>                          
                          Where will your plant be located?
                          <input type="checkbox" name="location" value="bedroom">Bedroom<br>
                          <input type="checkbox" name="location" value="office">Office<br>
                          <input type="checkbox" name="location" value="kitchen">Kitchen<br>
                          <input type="checkbox" name="location" value="bathroom">bathroom<br>
                          <input type="checkbox" name="location" value="livingroom">Living Room<br>
                          <input type="checkbox" name="location" value="front">Front Yard<br>
                          <input type="checkbox" name="location" value="back">Backyard<br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                           How big do you want your plant to be?
                          <input type="radio" name="size" value="tiny">Tiny (<12in)<br>
                          <input type="radio" name="size" value="small">Small (12-24in)<br>
                          <input type="radio" name="size" value="medium">Medium (24-36in)</br>
                          <input type="radio" name="size" value="large">Large (>36in)</input><br>
                          <input type="radio" name="size" value="none"> No Preference</br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                           How much sunlight does your space get during the day?
                          <input type="radio" name="light" value="alot">A lot of sunlgiht<br>
                          <input type="radio" name="light" value="some">Some sunlight<br>
                          <input type="radio" name="light" value="none">Not alot of sunlight</br>
                          <input type="radio" name="light" value="adjust">Adjustable<br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                           What is the average climate of your space?
                          <input type="radio" name="climate" value="cold">Cold (>45F)</input><br>
                          <input type="radio" name="climate" value="warm">Warm (45-74F)<br>
                          <input type="radio" name="climate" value="hot">Hot (>75F)</input></br>
                          <input type="radio" name="climate" value="adjustable">Adjustable<br>
                        </Col>
                        </Row>
                        </ListItem>
                          
                          
                        <ListItem>
                      <Row>
                          <Col>                          
                           Which best describes the weather condition of your space?
                          <input type="radio" name="weather" value="dry">Dry<br>
                          <input type="radio" name="weather" value="temperate">Temperate<br>
                          <input type="radio" name="weather" value="humid">Humid</br>
                          <input type="radio" name="weather" value="adjust">Adjustable<br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                          How often would you like to water your plant?
                          <input type="radio" name="water" value="daily">Daily<br>
                          <input type="radio" name="water" value="few">Every few days<br>
                          <input type="radio" name="water" value="weekly">Weekly</br>
                          <input type="radio" name="water" value="little">As little as possible<br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                         <Row>
                          <Col>                          
                           What kind of pets do you have?
                          <input type="checkbox" name="pets" value="dog">Dog<br>
                          <input type="checkbox" name="pets" value="cat">Cat<br>
                          <input type="checkbox" name="pets" value="rodent">Rodent<br>
                          <input type="checkbox" name="pets" value="rabbit">Rabbit<br>
                          <input type="checkbox" name="pets" value="ferret">Ferret<br>
                          <input type="checkbox" name="pets" value="bird">Bird<br>
                          <input type="checkbox" name="pets" value="reptile">Reptile<br>
                          <input type="checkbox" name="pets" value="fish">Fish<br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                         <Row>
                          <Col>  
                          Do you have an allergy to pollen?
                          <input type="radio" name="allery" value="yes">Yes</br>
                          <input type="radio" name="allery" value="no">No<br>
                        </Col>
                        </Row>
                        </ListItem>  
                  </List>
                  <Col size="md-6 sm-12">
            <Container>
              <h1>Your Plant Matches</h1>
            </Container>
            
          </Col>
        </Row>
      </Container>
    );
  }
}
                 
                
              
            
  export default Questionnaire;
  