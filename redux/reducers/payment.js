import * as actionTypes from '../actions/actionTypes';

const initialState = {
  shippingInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
