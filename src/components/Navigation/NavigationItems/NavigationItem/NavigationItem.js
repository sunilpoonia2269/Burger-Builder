import React from "react";
import Classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => (
  <li className={Classes.NavigationItem}>
    <NavLink
      to={props.link}
      activeClassName={Classes.Active}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
