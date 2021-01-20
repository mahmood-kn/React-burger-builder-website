import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const intialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.6,
};

const addIngredients = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingName]: state.ingredients[action.ingName] + 1,
  });
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredients = (state, action) => {
  const updateIngredients = updateObject(state.ingredients, {
    [action.ingName]: state.ingredients[action.ingName] - 1,
  });
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingName],
    building: true,
  };
  return updateObject(state, updateState);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFaild = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredients(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredients(state, action);
    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILD:
      return fetchIngredientsFaild(state, action);
    default:
      return state;
  }
};

export default reducer;
