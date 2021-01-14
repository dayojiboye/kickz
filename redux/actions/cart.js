import * as actionTypes from './actionTypes';

export const addToCart = (cartItem) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: cartItem,
  };
};

export const removeCartItem = (cartItem) => {
  return {
    type: actionTypes.REMOVE_CART_ITEM,
    payload: cartItem,
  };
};

export const reduceCartItem = (cartItem) => {
  return {
    type: actionTypes.REDUCE_CART_ITEM,
    payload: cartItem,
  };
};

export const clearCart = () => {
  return {
    type: actionTypes.CLEAR_CART,
  };
};
