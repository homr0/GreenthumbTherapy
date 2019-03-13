import React, { Component } from "react";
import API from "./utils/API";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            message: "Loading..."
        }
    }

    componentDidMount() {
        API.homeTest()
          .then(res => this.setState({message: res.data}));
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>{this.state.message}</p>
            </div>
        );
    }
}
