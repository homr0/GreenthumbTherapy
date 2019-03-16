import React from "react";

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
            <Input name="email" placeholder="Email" onChange={e => this.onChange(e)} value={this.state.email} />
            <Input name="password" placeholder="Password" type="pass" onChange={e => this.onChange(e)} value={this.state.password} />
            </div>
        );
    }
}  
