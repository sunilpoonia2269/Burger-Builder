import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import Classes from "./NavigationItems.module.css";

const NavigationItems = (props) => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Build Burger
    </NavigationItem>
    {props.isAuthenticated && (
      <NavigationItem link="/my-orders">My Orders</NavigationItem>
    )}

    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/authenticate">Authenticate</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
