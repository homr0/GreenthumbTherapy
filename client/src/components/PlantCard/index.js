import React from "react";
import { Col } from "../Grid";
import {List, ListItem} from "../List";
import {Btn} from "../Btn";
import "./style.css";
import placeholder from "./placeholder.png";

const PlantCard = props => {
  return (
    <Col size={(props.size) ? props.size : "s12 m4 plant-card"}>
      <div className={"card" + ((props.colorsCard) ? " " +  props.colorsCard : "")}>
        <div className="card-image">
          <img alt={(props.image) ? props.common_name : "Plant placeholder image"} src={(props.image) ? props.image : placeholder} />

          <Btn colors="btn-floating halfway-fab green" handleClickEvent={props.handleClickEvent}>
            <i className="material-icons">save</i>
          </Btn>
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

        <div className={"card-action" + ((props.colorsAction) ? " " + props.colorsAction : "")}>
          <a href={"https://wikipedia.org/wiki/" + props.scientific_name.replace(" ", "_")}>More Information</a>
        </div>
      </div>
    </Col>
  );
};

export default PlantCard;
