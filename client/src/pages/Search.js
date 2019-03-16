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

    let query = "&nursery_stock_product=true";

    