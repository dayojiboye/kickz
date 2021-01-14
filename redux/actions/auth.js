import * as actionTypes from './actionTypes';

import { auth, firestore } from '../../firebase/utils';
import Router from 'next/router';

export const authStart = (payload) => {
  return {
    type: actionTypes.AUTH_START,
    payload: payload,
  };
};

export const authError = (payload) => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: payload,
  };
};

export const setCurrentUser = (payload) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: payload,
  };
};

// create user data

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection('users')
        .doc(user.uid)
        .set(user)
        .then(() => {
          dispatch(setCurrentUser(user));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

// get user additional data

export const getUserAdditionalData = (user) => {
  return async (dispatch) => {
    try {
      await firestore
        .collection('users')
        .doc(user.uid)
        .get()
        .then((userData) => {
          if (userData.data()) {
            dispatch(setCurrentUser(userData.data()));
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
};

// sign up

export const signup = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(authStart(true));
    try {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          // auth.currentUser.sendEmailVerification();
          response.user.updateProfile({
            displayName,
          });

          const timestamp = new Date();
          const userRoles = 'user';

          const userData = {
            uid: response.user.uid,
            email,
            displayName,
            createdDate: timestamp,
            userRoles,
          };

          dispatch(createUser(userData));
        });
    } catch (err) {
      dispatch(authError(err.message));
    } finally {
      dispatch(authStart(false));
    }
  };
};

// sign in

export const signin = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authStart(true));
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          dispatch(setCurrentUser(response.user));
        });
    } catch (err) {
      dispatch(authError(err.message));
      // console.log(err.message);
    } finally {
      dispatch(authStart(false));
    }
  };
};

// sign out

export const signout = () => {
  return async (dispatch) => {
    try {
      await auth.signOut().then(() => {
        dispatch(setCurrentUser(null));
        Router.replace('/login');
      });
    } catch (err) {
      console.log(err);
    }
  };
};
