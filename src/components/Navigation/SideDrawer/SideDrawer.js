import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let attechClass = [Classes.SideDrawer, Classes.Close];
  if (props.show) {
    attechClass = [Classes.SideDrawer, Classes.Open];
  }
  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.closeSideDrawer} />

      <div className={attechClass.join(" ")}>
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default SideDrawer;
