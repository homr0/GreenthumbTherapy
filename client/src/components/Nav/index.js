import React from "react";

function Nav() {
  return (
    <nav>
    <div className="nav-wrapper">
      <a href="#" class="brand-logo">Greenthumb Therapy</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="questionnaire.html">Questionnaire</a></li>
        <li><a href="search.html">Search</a></li>
        <li><a href="user.html">User Page</a></li>
      </ul>
    </div>
  </nav>
  );
}

export default Nav;
