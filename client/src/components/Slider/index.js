import React from "react";
import "./style.css"

export const Slider = props => {
  return (
      <div className="slider">
        <ul className="slides z-depth-3">
          {props.children}
        </ul>
      </div>
  )
}

export const SliderItem = props => {
  return (
    <li>
      <img src={props.image} alt="" />

      <div className={"caption " + ((props.alignText) ? props.alignText : "left-align")}>
        <h3>{props.children}</h3>

        {(props.caption) && <h4>{props.caption}</h4>}
      </div>
    </li>
  )
}