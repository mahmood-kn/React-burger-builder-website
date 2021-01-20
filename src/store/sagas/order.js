import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    const res = yield axios.post(
      `/order.json?auth=${action.token}`,
      action.orderData
    );
    yield put(actions.purchaseOrderSuccess(res.data.name, action.orderData));
  } catch (err) {
    yield put(actions.purchaseOrderFail(err));
  }
}

export function* fetchOrderSaga(action) {
  yield put(actions.fetchOrderStart());
  try {
    const res = yield axios.get(
      `/order.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
    );
    const fetchedOrders = [];
    for (let key in res.data) {
      fetchedOrders.push({ ...res.data[key], id: key });
    }
    yield put(actions.fetchOrderSuccess(fetchedOrders));
  } catch (err) {
    yield put(actions.fetchOrderFail());
  }
}

export function* deleteOrderSaga(action) {
  yield put(actions.deleteOrderStart());
  try {
    yield axios.delete(`/order/${action.id}.json?auth=${action.token}`);
    const currentOrders = [...action.orders];
    const updatedOrders = currentOrders.filter(
      (order) => order.id !== action.id
    );
    yield put(actions.deleteOrder(updatedOrders));
  } catch (err) {
    yield put(actions.deleteOrderFail(err));
  }
}
