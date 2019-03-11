import React from "react";

export const Input = props => {
  return (
    <div className={"input-field col " + ((props.size) ? props.size : "s12")}>
      <input className="validate" id={props.id} type={(props.type) ? props.type : "text" } />
      <label for={props.id}>{props.children}</label>
    </div>
  );
};

export const Radio = props => {
  return (
    <p>
      <label>
        <input type="radio" name={props.name} value={props.value} />
        <span>{props.children}</span>
      </label>
    </p>
  );
}

export const Checkbox = props => {
  return (
    <p>
      <label>
        <input type="checkbox" id={props.id} className="filled-in" />
        <span>{props.children}</span>
      </label>
    </p>
  );
}