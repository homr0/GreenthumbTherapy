import React from "react";
import { Col } from "../Grid";
import {List, ListItem} from "../List";
// import "./style.css";
import placeholder from "./tulips.jpg";

const PlantCard = props => {
  return (
    <Col size={(props.size) ? props.size : "s12 m4"}>
      <div className={"card" + ((props.colorsCard) ? " " +  props.colorsCard : "")}>
        <div className="card-image">
          <img alt={(props.image) ? props.common_name : "Plant placeholder image"} src={(props.image) ? props.image : placeholder} />
        </div>

        <div className={"card-content" + ((props.colorsContent) ? " " +  props.colorsContent : "")}>
          <List>
            <ListItem>
              <strong>Name:</strong> {(props.common_name) ? props.common_name : "N/A"}
            </ListItem>

            <ListItem>
              <strong>Scientific Name:</strong> {props.scientific_name}
            </ListItem>
          </List>
        </div>
      </div>
    </Col>
  );
};

export default PlantCard;
