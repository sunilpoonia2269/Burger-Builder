import React from "react";
import BurgerLogo from "../../assets/images/burger-logo.png";
import Classes from "./Logo.module.css";

const Logo = (props) => (
  <div className={Classes.Logo}>
    <img src={BurgerLogo} alt="My Burger" />
  </div>
);

export default Logo;
