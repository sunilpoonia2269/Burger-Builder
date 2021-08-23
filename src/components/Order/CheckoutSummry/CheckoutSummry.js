import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import Classes from "./CheckoutSummry.module.css";

const CheckoutSummry = (props) => {
  return (
    <div className={Classes.CheckoutSummry}>
      <h1>Hope it looks good!</h1>
      <div className={Classes.BurgerPreview}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummry;
