import React from "react";
import { Input } from "../components/Form";

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
            <div>
            <Input name="email" type="email"
             placeholder="Email"
              onChange={e => this.onChange(e)} value={this.state.email} />
            <Input name="password" type="password"
             placeholder="Password"
             onChange={e => this.onChange(e)} value={this.state.password} />
            </div>
        );
    }
}  
