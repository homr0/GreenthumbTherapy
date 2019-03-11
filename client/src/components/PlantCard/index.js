import React from "react";
import {List, ListItem} from "../List";
import "./style.css";

const PlantCard = props => {
  return (
    <div className={"card" + props.colors}>
      <div className="card-image">
        <img alt={props.name} src={props.image} />
      </div>

      <div className="card-content">
        <List>
          <ListItem>
            <strong>Name:</strong> {props.name}
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default PlantCard;
