import React from "react";
import {Btn}  from "../components/Btn";
import { Input } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
// import { Input } from "../components/Form";

export default class Register extends React.Component {
    state = {
        email: "",
        password: "",

    }
    onChange = (e) => {
        const value = e.target.checked === undefined? e.target.value: e.target.checked;
        this.setState({
            [e.target.email]: value
        });
    }
    render() {
        return (
            <Row>
            <Col size="m6">
            <form>
            <Input 
                name="email" type="email" id="email"
                handleInputChange={this.handleInputChange}
               // onChange={e => this.onChange(e)} value={this.state.email} 
                size="s6">Email
             </Input>
            <Input 
                name="password" type="password" id="password"
                handleInputChange={this.handleInputChange}
                // onChange={e => this.onChange(e)} value={this.state.password}
                size="s6">Password
            </Input>
             <Btn
                 //  
                   onClick={this.handleFormSubmit}
                  >
                   Update Password
           </Btn>
            </form>
            </Col>
            </Row>
            
        );
    }
}  
