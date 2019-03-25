import React from "react";
import "./style.css";

export const List = ({ list, children }) => (list === "ol") ? <ol className="collection">{children}</ol> : <ul className="collection">{children}</ul>;

export const ListHeader = ({ colors, children }) => <li className={"collection-header" + ((colors) ? " " + colors : "")}>{children}</li>

export const ListItem = ({ colors, children }) => <li className={"collection-item"  + ((colors) ? " " + colors : "")}>{children}</li>;