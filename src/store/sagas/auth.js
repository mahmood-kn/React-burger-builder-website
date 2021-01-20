import { delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'userId');
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expireDate');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.authLogout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA6sYcG0HgRt7KcetWml77GRwhqQmmCJIU';

  if (!action.isSignUp) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA6sYcG0HgRt7KcetWml77GRwhqQmmCJIU';
  }

  try {
    const res = yield call([axios, 'post'], url, authData);
    // const res = yield axios.post(url, authData);
    const expireDate = yield new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );
    yield localStorage.setItem('userId', res.data.localId);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expireDate', expireDate);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expireDate'));
    if (expirationDate <= new Date()) {
      yield put(actions.authLogout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
