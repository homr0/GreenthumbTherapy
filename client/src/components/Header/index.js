import React from "react";
import Nav from "../Nav";
import "./style.css";
import header from "./header.jpeg";

const Header = ({ name, children }) =>{
  return (
    <header>
      <Nav
        colorNav="teal darken-3"
        colorLink="teal darken-3"
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
