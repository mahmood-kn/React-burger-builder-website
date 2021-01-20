import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const purchaseOrderSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.id });
  return updateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true,
  });
};

const purchaseOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};
const fetchOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchOrderSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const fetchOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const deleteOrderStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const deleteOrder = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

const deleteOrderFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER_START:
      return purchaseOrderStart(state, action);
    case actionTypes.PURCHASE_ORDER_SUCCESS:
      return purchaseOrderSuccess(state, action);
    case actionTypes.PURCHASE_ORDER_FAIL:
      return purchaseOrderFail(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.FETCH_ORDER_START:
      return fetchOrderStart(state, action);
    case actionTypes.FETCH_ORDER_SUCCESS:
      return fetchOrderSuccess(state, action);
    case actionTypes.FETCH_ORDER_FAIL:
      return fetchOrderFail(state, action);
    case actionTypes.DELETE_ORDER_START:
      return deleteOrderStart(state, action);
    case actionTypes.DELETE_ORDER:
      return deleteOrder(state, action);
    case actionTypes.DELETE_ORDER_FAIL:
      return deleteOrderFail(state, action);
    default:
      return state;
  }
};

export default reducer;
