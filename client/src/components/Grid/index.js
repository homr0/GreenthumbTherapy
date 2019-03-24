import React from "react";

export const Container = ({children}) => {
  return(
    <div className="container">
      {children}
    </div>
  );
}


export const Row = ({id, children}) => {
  return(
    <div className="row" id={id}>
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
