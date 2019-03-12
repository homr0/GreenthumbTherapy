import React, { Component } from "react";
import Btn from "../components/Btn";
import Nav from "../components/Nav";
import Header from "../components/Header";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, Radio, Checkbox } from "../components/Form";

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
            <Col>
               <p>Plant Matcher</p>
                  
                <List list="ol">
                  <ListItem>
                      <Row>
                          <Col>                      
                            What type of plant appeals to you?
                            <Radio name="plant" value="flower">Flower</Radio>
                            <Radio name="plant" value="edible">Edible</Radio><br>
                            <Radio name="plant"value="cactus">Succulent/Cactus</Radio></br>
                            <Radio name="plant" value="tree">Tree</Radio><br>
                            <Radio name="plant"value="shrub">Shrub</Radio><br>
                            <Radio name="plant"value="none">No Preference</Radio></br>
                        </Col>
                        </Row>
                        </ListItem>

                        
                  <ListItem>
                      <Row>
                          <Col>                          
                          Where will your plant be located?
                          <Checkbox name="location" value="bedroom">Bedroom</Checkbox><br>
                          <Checkbox name="location"value="office">Office</Checkbox><br>
                          <Checkbox name="location"value="kitchen">Kitchen</Checkbox><br>
                          <Checkbox name="location"value="bathroom">Bathroom</Checkbox><br>
                          <Checkbox name="location"value="livingroom">Living Room</Checkbox><br>
                          <Checkbox name="location"value="front">Front Yard</Checkbox><br>
                          <Checkbox name="location"value="back">Backyard</Checkbox><br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                           How big do you want your plant to be?
                          <Radio name="size" value="tiny">Tiny (<12in)</Radio><br>
                          <Radio name="size" value="small">Small (12-24in)</Radio><br>
                          <Radio name="size" value="medium">Medium (24-36in)</Radio></br>
                          <Radio name="size" value="large">Large (>36in)</Radio><br>
                          <Radio name="size" value="none"> No Preference</Radio></br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                           How much sunlight does your space get during the day?
                          <Radio name="light" value="alot">A lot of sunlight</Radio><br>
                          <Radio name="light" value="some">Some sunlight</Radio><br>
                          <Radio name="light" value="none">Not alot of sunlight</Radio></br>
                          <Radio name="light" value="adjust">Adjustable</Radio><br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                           What is the average climate of your space?
                           <Radio name="climate" value="cold">Cold (>45F)</Radio><br>
                           <Radio name="climate" value="warm">Warm (45-74F)</Radio><br>
                           <Radio name="climate" value="hot">Hot (>75F)</Radio>></br>
                           <Radio name="climate" value="adjustable">Adjustable</Radio><br>
                        </Col>
                        </Row>
                        </ListItem>
                          
                          
                        <ListItem>
                      <Row>
                          <Col>                          
                           Which best describes the weather condition of your space?
                           <Radio name="weather" value="dry">Dry</Radio><br>
                           <Radio name="weather" value="temperate">Temperate</Radio><br>
                           <Radio name="weather"value="humid">Humid</Radio></br>
                           <Radio name="weather" value="adjust">Adjustable</Radio><br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                      <Row>
                          <Col>                          
                          How often would you like to water your plant?
                          <Radio name="water" value="daily">Daily</Radio><br>
                          <Radio name="water" value="few">Every few days</Radio><br>
                          <Radio name="water" value="weekly">Weekly</Radio></br>
                          <Radio name="water" value="little">As little as possible</Radio><br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                         <Row>
                          <Col>                          
                           What kind of pets do you have?
                          <Checkbox name="pets" value="dog">Dog</Checkbox><br>
                          <Checkbox name="pets" value="cat">Cat</Checkbox><br>
                          <Checkbox name="pets" value="rodent">Rodent</Checkbox><br>
                          <Checkbox name="pets" value="rabbit">Rabbit</Checkbox><br>
                          <Checkbox name="pets" value="ferret">Ferret</Checkbox><br>
                          <Checkbox name="pets" value="bird">Bird</Checkbox><br>
                          <Checkbox name="pets" value="reptile">Reptile</Checkbox><br>
                          <Checkbox name="pets" value="fish">Fish</Checkbox><br>
                        </Col>
                        </Row>
                        </ListItem>

                        <ListItem>
                         <Row>
                          <Col>  
                          Do you have an allergy to pollen?
                          <Radio name="allergy" value="yes">Yes</Radio></br>
                          <Radio name="allergy" value="no">No</Radio><br>
                        </Col>
                        </Row>
                        </ListItem>  
                  </List>
                  <Col>
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
  