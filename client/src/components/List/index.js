import React from "react";
import "./style.css";



export const List = ({ list, children }) => (list === "ol") ? <ol className="collection">{children}</ol> : <ul className="collection">{children}</ul>;

export const ListItem = ({ children })=> <li className="collection-item">{children}</li>;
