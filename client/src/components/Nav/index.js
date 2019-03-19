import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import thumb from "./thumb.jpg";

const Nav = props => {
  return (
    <>
      <nav>
        <div
          className={
            "nav-wrapper" + (props.colorNav ? " " + props.colorNav : "")
          }
        >
          <a href="/" className="brand-logo">
            Greenthumb Therapy
            <img src={thumb} alt="" id= "thumb" width="45px" height="50px"/>
          </a>
          {/* eslint-disable-next-line */}
          <a href="#" data-target="mobile-demo" className="sidenav-trigger right">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link
                to="/questionnaire"
                className={
                  props.colorLink +
                  (window.location.pathname === "/questionnaire"
                    ? " active"
                    : "")
                }
              >
                Questionnaire
              </Link>
            </li>

            <li>
              <Link
                to="/search"
                className={
                  props.colorLink +
                  (window.location.pathname === "/search" ? " active" : "")
                }
              >
                Search
              </Link>
            </li>

            <li>
              <Link
                to="/user"
                className={
                  props.colorLink +
                  (window.location.pathname === "/user" ? " active" : "")
                }
              >
                User Page
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/questionnaire">Questionnaire</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/user">User Page</Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
