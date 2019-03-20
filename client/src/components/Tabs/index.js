import React from "react";
import "./style.css";
import { Row, Col } from  "../Grid";

const Tabs = ({tabs, activeTab, children}) => {
  return(
    <Row>
      <Col>
        <ul className="tabs">
          {tabs.map(tab =>
            <li className="tab" key={tab.link}>
              <a href={"#" + tab.link} className={(tab.link === activeTab) ? "active" : null}>{tab.label}</a>
            </li>
          )}
        </ul>
      </Col>

      {children}
    </Row>
  );
}

export default Tabs;
