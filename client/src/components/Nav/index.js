import React from "react";
import { Link } from "react-router-dom";

const Nav = props => {
  return (
    <nav>
      <div className={"nav-wrapper z-depth-3" + ((props.colorNav) ? " " + props.colorNav : "")}>
        <a href="/" className="brand-logo">Greenthumb Therapy</a>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/questionnaire" className={props.colorLink + (window.location.pathname === "/questionnaire" ? " active" : "")}>
              Questionnaire
            </Link>
          </li>

          <li>
            <Link to="/search" className={props.colorLink + (window.location.pathname === "/search" ? " active" : "")}>
              Search
            </Link>
          </li>

          <li>
            <Link to="/user" className={props.colorLink + (window.location.pathname === "/user" ? " active" : "")}>
              User Page
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
