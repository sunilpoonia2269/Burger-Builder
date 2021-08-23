import React from "react";
import Logo from "../../Logo/Logo";
import Classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../NavigationItems/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
  <header className={Classes.Toolbar}>
    <DrawerToggle openSideDrawer={props.openSideDrawer} />
    <div className={Classes.Logo}>
      <Logo />
    </div>

    <nav className={Classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
