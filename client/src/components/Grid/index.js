import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export const Container = ({children}) => {
  return(
    <div className="container">
      {children}
    </div>
  );
}


export const Row = ({id, children}) => {
  return(
    <div className="row" data-aos={(id === "plant-results") && "zoom-in"} id={id}>
      {children}
    </div>
  );
}


export const Col =({ id, size, children })=> {
  return (
    <div className={"col " + ((size) ? size : "s12")} id={id}>
      {children}
    </div>
  );
}
