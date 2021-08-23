import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummry = (props) => {
  const style = {
    textTransform: "capitalize",
    fontWeight: "bold",
  };
  let ingredientSummry = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={style}>{igKey} : </span>
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients : </p>
      <ul>{ingredientSummry}</ul>
      <p>
        <strong>Total Price : ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout ?</p>
      <Button btnType={"Danger"} clicked={props.cancelOrder}>
        CANCEL
      </Button>
      <Button btnType={"Success"} clicked={props.continueOrder}>
        CONTINUE
      </Button>
    </Auxiliary>
  );
};

export default OrderSummry;
