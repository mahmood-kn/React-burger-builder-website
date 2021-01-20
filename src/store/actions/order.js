import * as actionTypes from './actionTypes';

export const purchaseOrderSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    id,
    orderData,
  };
};

export const purchaseOrderFail = (err) => {
  return {
    type: actionTypes.PURCHASE_ORDER_FAIL,
    err,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  };
};

export const fetchOrderSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders,
  };
};

export const fetchOrderFail = () => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
  };
};

export const fetchOrder = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDER,
    token,
    userId,
  };
};

export const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START,
  };
};

export const deleteOrder = (orders) => {
  return {
    type: actionTypes.DELETE_ORDER,
    orders,
  };
};

export const deleteOrderFail = (error) => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error,
  };
};

export const deleteOrderHandler = (id, orders, token) => {
  return {
    type: actionTypes.DELETE_ORDER_HANDLER,
    id,
    orders,
    token,
  };
};
