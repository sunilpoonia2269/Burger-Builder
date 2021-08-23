import React from "react";
import Classes from "./BurgerIngredients.module.css";
import PropTypes from "prop-types";

const BurgerIngredients = (props) => {
  let ingredients = null;

  // Using switch statement to get one of many ingredients
  switch (props.type) {
    case "bread-bottom":
      ingredients = <div className={Classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredients = (
        <div className={Classes.BreadTop}>
          <div className={Classes.Seeds1}></div>
          <div className={Classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredients = <div className={Classes.Meat}></div>;
      break;
    case "cheese":
      ingredients = <div className={Classes.Cheese}></div>;
      break;
    case "salad":
      ingredients = <div className={Classes.Salad}></div>;
      break;
    case "bacon":
      ingredients = <div className={Classes.Bacon}></div>;
      break;
    default:
      ingredients = null;
      break;
  }
  return ingredients;
};
BurgerIngredients.prototype = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredients;
