import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">Greenthumb Therapy</a>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <Link to="/questionnaire" className={(window.location.pathname === "/questionnaire" ? "active" : "")}>
              Questionnaire
            </Link>
          </li>

          <li>
            <Link to="/search" className={(window.location.pathname === "/search" ? "active" : "")}>
              Search
            </Link>
          </li>

          <li>
            <Link to="/user" className={(window.location.pathname === "/user" ? "active" : "")}>
              User Page
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
