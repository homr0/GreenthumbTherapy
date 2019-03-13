import React, { Component } from "react";
import API from "./utils/API";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: " ",
            password: " "
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
        API.loginTest(JSON.stringify(this.state))
        .then(res => {
            if(res.status === 200) this.props.history.push("/");
            else {
                const error = new Error(res.error);
                throw error;
            }
        })
        .catch(err => {
            console.log(err);
            alert("Error logging in. Please Try again.");
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
            <h1>Login Below!</h1>
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