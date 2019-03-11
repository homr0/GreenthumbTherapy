import React from "react";
import Nav from "../Nav";

const Header = ({ children }) =>{
  return (
    <header>
      <Nav
        colorNav="green"
        colorLink="green darken-1"
      />

      <h1>Greenthumb Therapy</h1>
    </header>
  );
}

export default Header;
