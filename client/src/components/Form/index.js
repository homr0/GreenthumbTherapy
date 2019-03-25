import React from "react";
import "./style.css";

export const Input = props => {
  return (
    <div className={"input-field col " + ((props.size) ? props.size : "s12")}>
      <input className="validate" id={props.id} type={(props.type) ? props.type : "text"} min={props.min} max={props.max} name={props.name} onChange={props.handleInputChange} />
      <label htmlFor={props.id}>{props.children}</label>
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

export const Select = props => {
  return (
    <div className="input-field col s12">
      <select name={props.name}>
        {props.options.map(option => <option 
          value={option.value}
          onChange={props.handleInputChange}
          >
            {props.label}
          </option>)}
      </select>
      <label>{props.children}</label>
    </div>        
  );
}

export const Switch = props => {
  return (

  <div className="switch">
    {props.children}
    <label>
      {props.offLabel}
      <input type="checkbox" className="switch-box" name={props.name} onChange={props.handleInputChange} />
      <span className="lever"></span>
      {props.onLabel}
    </label>
  </div>
        
  );
}
