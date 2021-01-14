import * as actionTypes from '../actions/actionTypes';

import {
  handleAddToCart,
  handleRemoveCartItem,
  handleReduceCartItem,
} from '../../utils/cart.helpers';

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: handleAddToCart(state.cart, action.payload),
      };
    case actionTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cart: handleRemoveCartItem(state.cart, action.payload),
      };
    case actionTypes.REDUCE_CART_ITEM:
      return {
        ...state,
        cart: handleReduceCartItem(state.cart, action.payload),
      };
    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default reducer;
