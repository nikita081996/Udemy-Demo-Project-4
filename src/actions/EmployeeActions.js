import { Actions } from 'react-native-router-flux';
import { EMPLOYEE_UPDATE, EMPLOYEES_FETCH_SUCCESS } from './types';

export const employeeUpdate = ({ prop, value }) => ({
  type: EMPLOYEE_UPDATE,
  payload: { prop, value }
});

export const employeeCreate = ({ name, phone, shift }) => {
  const firebase = require('firebase');

  const { currentUser } = firebase.auth();
  return () => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => Actions.employeeList({ type: 'reset' }));
    // type: EMPLOYEE_CREATE,
    // payload: { name, phone, shift }
  };
};

export const employeesFetch = () => {
  const firebase = require('firebase');

  const { currentUser } = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
