import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.7,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

// Utility Methods used for cleaner switch statments
const addIngredients = (state, action) => {
  const ingredients = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, ingredients);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const ingredients = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, ingredients);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};

// Reducer Functionality for building burger
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);

    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
