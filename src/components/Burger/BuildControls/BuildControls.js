import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import Classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
];
const BuildControls = (props) => {
  return (
    <div className={Classes.BuildControls}>
      <p>
        Current Price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={() => props.addIngredients(ctrl.type)}
            removed={() => props.removeIngredients(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={Classes.OrderButton}
        disabled={props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "LOGIN TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
