import React from "react";

export const Btn = (props) => {
  return(
    <button onClick={props.handleClickEvent} className={"btn waves-effect waves-light " + props.colors}>
      {props.children}
    </button>
  );
}

export const BtnA = (props) => {
  return(
    <a href={props.link} target="_blank" rel="noopener noreferrer" className={"btn waves-effect waves-light " + props.colors}>
      {props.children}
    </a>
  );
}