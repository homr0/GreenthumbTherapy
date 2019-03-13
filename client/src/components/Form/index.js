import React from "react";
import "./style.css";

export const Input = props => {
  return (
    <div className={"input-field col " + ((props.size) ? props.size : "s12")}>
      <input className="validate" id={props.id} type={(props.type) ? props.type : "text" } name={props.name} onChange={props.handleInputChange} />
      <label for={props.id}>{props.children}</label>
    </div>
  );
};

export const Radio = props => {
  return (
    <label className={(props.list) ? "input-list" : "input-line"}>
      <input type="radio" name={props.name} value={props.value} onChange={props.handleInputChange} />
      <span>{props.children}</span>
    </label>
  );
}

export const Checkbox = props => {
  return (
    <label className={(props.list) ? "input-list" : "input-line"}>
      <input type="checkbox" name={props.name} value={props.value} className="filled-in" onChange={props.handleInputChange}  />
      <span>{props.children}</span>
    </label>
  );
}