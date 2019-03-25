import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Nav = props => {
  return (
    <>
      <nav>
        <div className={"nav-wrapper" + ((props.colorNav) ? " " + props.colorNav : "")}>
          <a href="/" className="brand-logo">Greenthumb Therapy</a>

          {/* eslint-disable-next-line */}
          <a href="#" data-target="mobile-demo" className="sidenav-trigger right">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/questionnaire" className={props.colorLink + ((window.location.pathname === "/questionnaire") ? " active" : "")}>
              <i className="material-icons left">content_paste</i>Questionnaire
              </Link>
            </li>

            <li>
              <Link to="/search" className={props.colorLink + ((window.location.pathname === "/search") ? " active" : "")}>
              <i className="material-icons left">search</i>Search
              </Link>
            </li>
          </ul>

          {(props.name) 
            ? <span className="right hide-on-med-and-down">
                Welcome, <a href="/user">{props.name}</a>
                <a href="/logout">
                  <i className="material-icons left">assignment_ind</i> Logout
                </a>
              </span>
            : <span className="right hide-on-med-and-down">
                <i className="material-icons left">assignment_ind</i>
                <a href="/login">Log in</a> or <a href="/register">Register</a>
              </span>
          }
        </div>


      </nav>

      <ul className="sidenav" id="mobile-demo">
        {(props.name) 
          ? <li>
              <Link to="/user">
                <i className="material-icons left">assignment_ind</i> {props.name}
              </Link>
              <Link to="/logout">
                <i className="material-icons left">assignment_ind</i> Logout
              </Link>
            </li>
          : <li>
              <i className="material-icons left">assignment_ind</i>
              <Link to="/login">Log in</Link> or <Link to="/register">Register</Link>
            </li>
          }
        <li>
        <i className="material-icons left">content_paste</i>
          <Link to="/questionnaire">Questionnaire</Link>
        </li>
        <li>
        <i className="material-icons left">search</i>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;

