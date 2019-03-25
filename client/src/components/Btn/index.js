import React from "react";

export const Btn = (props) => {
  return(
    <button onClick={props.handleClickEvent} className={"btn waves-effect" + ((props.colors) ? " " + props.colors : " teal darken-3")}>
      {props.children}
    </button>
  );
}

export const BtnA = (props) => {
  return(
    <a href={props.link} target="_blank" rel="noopener noreferrer" className={"btn waves-effect" +  + ((props.colors) ? " " + props.colors : " teal darken-3")}>
      {props.children}
    </a>
  );
}