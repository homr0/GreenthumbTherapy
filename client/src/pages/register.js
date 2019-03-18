import React, { Component } from 'react';
import API from '../utils/API';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    API.registerTest(JSON.stringify(this.state))
    console.log('New User Registered');
    };

    render() {
      return (
        <form onSubmit={this.onSubmit}>
          <h1>Register Below!</h1>
          <input 
          type="firstname"
          name="firstname"
          placeholder="Enter first name"
          value={this.state.firstname}
          onchange={this.handleInputChange}
          />
          <input
          type="lastname"
          name="lastname"
          placeholder="Enter last name"
          value={this.state.lastname}
          onchange={this.handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Submit"/>
        </form>
      );
    }
  }

  