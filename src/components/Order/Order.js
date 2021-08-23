import React from "react";
import Classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      ingredientName: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }
  const showIngredient = ingredients.map((ig) => {
    return (
      <span key={ig.ingredientName}>
        {ig.ingredientName}({ig.amount})
      </span>
    );
  });
  return (
    <div className={Classes.Order}>
      <p>Ingredients : {showIngredient}</p>
      <p>
        Price : <strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
