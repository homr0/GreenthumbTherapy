import React, { Component } from 'react';
import API from "../utils/API";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status_message: "You are logging out..."
    }
  }
  
  componentDidMount() {
    API.logout()
      .then(res => {
        this.setState({
          status_message: res.data.message
        });

        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          status_message: "You are not currently logged in. You will be redirected back to the Home page."
        });

        this.props.history.push("/");
      });
  }

  render() {
    return(
      <p className="center">{this.state.status_message}</p>
    );
  }
}

export default Logout;