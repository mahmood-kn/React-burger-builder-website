import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
  it('should save the token', () => {
    expect(
      reducer(
        {
          token: localStorage.getItem('token'),
          userId: localStorage.getItem('userId'),
          error: null,
          loading: false,
          authRedirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: 'some-token',
          userId: 'some-userId',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'some-userId',
      error: null,
      loading: false,
      authRedirectPath: '/',
    });
  });
});
