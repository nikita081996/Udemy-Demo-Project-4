import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESSFUL, LOGIN_FAIL, LOGIN_USER } from './types';
import { Actions } from 'react-native-router-flux';

export const onEmailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text
});

export const onPasswordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text
});

export const loginUser = ({ email, password }) => dispatch => {
  const firebase = require('firebase');

  dispatch({ type: LOGIN_USER });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
    });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({ type: LOGIN_SUCCESSFUL, payload: user });
  Actions.main();
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_FAIL, payload: LOGIN_FAIL });
};
