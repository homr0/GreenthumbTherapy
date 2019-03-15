import React from "react";
import Nav from "../Nav";
import "./style.css";
import header from "./header.jpeg";

const Header = ({ children }) =>{
  return (
    <header>
      <Nav
        colorNav="green"
        colorLink="green"
      />

      <div className="parallax-container">
        <div className="parallax">
          <img src={header} alt="" />
          </div>
      </div>
    </header>
  );
}

export default Header;
