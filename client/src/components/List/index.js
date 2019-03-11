import React from "react";
import "./style.css";



export const List = ({ list, children }) => (list === "ol") ? <ol className="collection">{children}</ol> : <ul className="collection">{children}</ul>;

export const ListItem = ({ colors, children }) => <li className={"collection-item " + colors}>{children}</li>;