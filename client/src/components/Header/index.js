import React from "react";
import Nav from "../Nav";
import "./style.css";
import header from "./header.jpeg";

const Header = ({ name, children }) =>{
  return (
    <header>
      <Nav
        colorNav="teal lighten-2"
        colorLink="teal lighten-2"
        name={name}
      />

      <div className="parallax-container z-depth-4">
        <div className="parallax">
          <img src={header} alt="" />
          </div>
      </div>
    </header>
  );
}

export default Header;
