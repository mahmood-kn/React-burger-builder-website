import * as actionTypes from './actionTypes';
export const addIngredients = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingName,
  };
};

export const removeIngredients = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients,
  };
};

export const fetchIngredientsFaild = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILD,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
};
