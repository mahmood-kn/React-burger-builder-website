import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
  try {
    const res = yield axios.get(
      'https://react-burger-f8427.firebaseio.com/ingredients.json'
    );
    yield put(actions.setIngredients(res.data));
    yield put(actions.authCheckState());
  } catch (err) {
    yield put(actions.fetchIngredientsFaild());
  }
}
