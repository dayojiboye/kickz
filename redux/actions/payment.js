import * as actionTypes from './actionTypes';

export const setShippingInfo = (payload) => {
  return {
    type: actionTypes.SET_SHIPPING_INFO,
    payload: payload,
  };
};
