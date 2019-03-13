import React, { Component } from "react";
import API from "./utils/API";

export default class Secret extends Component {
    constructor() {
        super();
        this.state = {
            message: "Loading..."
        }
    }

    componentDidMount() {
        API.secretTest()
        .then(res => res.text())
        .then(res => this.setState({message: res}));
    }

    render() {
        return (
            <div>
                <h1>Secret</h1>
                <p>{this.state.message}</p>
            </div>
        );
    }
}
