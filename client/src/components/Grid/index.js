import React from "react";


export const Container = ({children}) => {
  return(
    <div className="container">
      {children}
    </div>
  );
}


export const Row = ({children}) => {
  return(
    <div className="row">
      {children}
    </div>
  );
}


export const Col =({ size, children })=> {
  return (
    <div className={"col " + ((size) ? size : "s12")}>
      {children}
    </div>
  );
}
