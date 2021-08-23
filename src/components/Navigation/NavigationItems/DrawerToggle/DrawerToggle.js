import React from "react";
import Classes from "./DrawerToggle.module.css";

const DrawerToggle = (props) => (
  <div onClick={props.openSideDrawer} className={Classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawerToggle;
