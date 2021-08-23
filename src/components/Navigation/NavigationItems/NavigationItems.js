import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import Classes from "./NavigationItems.module.css";

const NavigationItems = () => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Build Burger
    </NavigationItem>
    <NavigationItem link="/my-orders">My Orders</NavigationItem>
  </ul>
);

export default NavigationItems;
