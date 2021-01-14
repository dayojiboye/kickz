import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orderHistory: null,
  orderDetails: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case actionTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case actionTypes.SET_ORDER_INIT:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
