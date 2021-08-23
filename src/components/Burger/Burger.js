import React from "react";
import Classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const Burger = (props) => {
  // Getting props from burger builder as object and then convertin all keys in array
  // And through that array passing types to burger ingredients

  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((array, current) => {
      return array.concat(current);
    }, []);

  if (transformedIngredients.length <= 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={Classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
