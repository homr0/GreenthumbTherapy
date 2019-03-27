import React from "react";
import { Col } from "../Grid";
import {List, ListItem} from "../List";
import {Btn} from "../Btn";
import "./style.css";
import placeholder from "./placeholder.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const PlantCard = props => {
  return (
    <Col size={"plant-card " + ((props.size) ? props.size : "s12 m6 l4")}>
      <div data-aos="zoom-out" className={"card" + ((props.colorsCard) ? " " +  props.colorsCard : "")}>
        <div className="card-image">
          <img alt={(props.image) ? props.common_name : "Plant placeholder image"} src={(props.image) ? props.image : placeholder} />

          {(props.favorite)
            ? <Btn colors={"btn-floating halfway-fab red darken-2 right"  + ((props.userBan) ? " hide" : "")} handleClickEvent={props.handleDeleteEvent}>
              <i className="material-icons">delete</i>
            </Btn>
            
            : <Btn colors={"btn-floating halfway-fab green darken-2 right"  + ((props.userBan) ? " hide" : "")} handleClickEvent={props.handleSaveEvent}>
              <i className="material-icons">save</i>
            </Btn>
          }

          {(props.banned)
            ? <Btn colors={"btn-floating halfway-fab blue darken-2 left" + ((props.userFav) ? " hide" : "")} handleClickEvent={props.handleUnBanEvent}>
              <i className="material-icons">done</i>
            </Btn>
            : <Btn colors={"btn-floating halfway-fab orange darken-2 left"  + ((props.userFav) ? " hide" : "")} handleClickEvent={props.handleBanEvent}>
              <i className="material-icons">do_not_disturb</i>
            </Btn>
          }

        </div>

        <div className={"card-content" + ((props.colorsContent) ? " " +  props.colorsContent : "")}>
          <List>
            <ListItem>
              <strong>Name:</strong> {(props.common_name) ? props.common_name : "N/A"}
            </ListItem>

            <ListItem>
              <strong>Scientific Name:</strong> {props.scientific_name}
            </ListItem>

            {(props.shade_tolerance) && 
              <ListItem>
                <strong>Needs: </strong>
                {((props.shade_tolerance === "Intolerant") && <span><i className="fas fa-sun"></i> Full Sun</span>)
                  || ((props.shade_tolerance === "Intermediate") && <span><i className="fas fa-cloud-sun"></i> Partial Sun</span>)
                  || ((props.shade_tolerance === "Tolerant") && <span><i className="fas fa-cloud"></i> Shade</span>)
                }
              </ListItem>}
          </List>

          
        </div>

        <div className={"card-action" + ((props.colorsAction) ? " " + props.colorsAction : "")}>
          <a href={"https://wikipedia.org/wiki/" + props.scientific_name.replace(" ", "_")} target="_blank" rel="noopener noreferrer"><i class="fab fa-wikipedia-w left small" ></i></a>
          {(props.common_name) && <a href={"https://www.google.com/search?tbm=shop&q=" + props.common_name.replace(" ", "+")} target="_blank" rel="noopener noreferrer"><i class="fas fa-shopping-cart right small"></i></a>}
        </div>
      </div>
    </Col>
  );
};

export default PlantCard;
