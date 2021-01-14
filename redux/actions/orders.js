import * as actionTypes from './actionTypes';

import { auth } from '../../firebase/utils';

import * as actions from './index';

import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrderDetails,
} from '../../utils/orders.helpers';

export const setOrderInit = (payload) => {
  return {
    type: actionTypes.SET_ORDER_INIT,
    payload: payload,
  };
};

// save user order to database

export const saveUserOrder = (payload) => {
  return (dispatch) => {
    const timestamp = new Date();

    try {
      handleSaveOrder({
        ...payload,
        orderUserID: auth.currentUser.uid,
        orderCreatedDate: timestamp,
      }).then(() => {
        dispatch(actions.clearCart());
        dispatch(actions.setShippingInfo(null));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// fetch user order history

export const setUserOrderHistory = (payload) => {
  return {
    type: actionTypes.SET_USER_ORDER_HISTORY,
    payload: payload,
  };
};

export const setUserOrder = (userId) => {
  return async (dispatch) => {
    dispatch(setOrderInit(true));
    try {
      const history = await handleGetUserOrderHistory(userId);

      dispatch(setUserOrderHistory(history));
      // console.log(history);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setOrderInit(false));
    }
  };
};

// fetch single order details

export const setOrderDetails = (payload) => {
  return {
    type: actionTypes.SET_ORDER_DETAILS,
    payload: payload,
  };
};

export const fetchOrderDetails = (orderId) => {
  return async (dispatch) => {
    dispatch(setOrderInit(true));
    try {
      const orderDetails = await handleGetOrderDetails(orderId);

      dispatch(setOrderDetails(orderDetails));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setOrderInit(false));
    }
  };
};
