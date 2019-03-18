import React from "react";
import "./style.css";
import { Row, Col } from  "../Grid";

const Tabs = ({tabs, children}) => {
  return(
    <Row>
      <Col>
        <ul className="tabs">
          {tabs.map(tab =>
            <li className="tab">
              <a href={"#" + tab.link}>{tab.label}</a>
            </li>
          )}
        </ul>
      </Col>

      {children}
    </Row>
  );
}

export default Tabs;
