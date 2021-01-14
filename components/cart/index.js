import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { totalCartPrice } from '../../utils/cart.helpers';
import EmptyBox from '../ui/emptyBox';
import CartItem from './cartItem';
import ShopLink from '../ui/links/shopLink';
import CheckoutLink from '../ui/links/checkoutLink';
import classes from './cart.module.scss';

const Cart = () => {
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const { cart } = useSelector((state) => {
    return {
      cart: state.cart.cart,
    };
  });

  const dispatch = useDispatch();

  const emptyCartMsg = 'No product in your cart. Add some now!';

  const handleRemoveItem = (id) => {
    // console.log(id);
    dispatch(actions.removeCartItem(id));
  };

  const increaseItemHandler = (prod) => {
    dispatch(actions.addToCart(prod));
  };

  const decreaseItemHandler = (prod) => {
    dispatch(actions.reduceCartItem(prod));
  };

  useEffect(() => {
    setCartTotalPrice(totalCartPrice(cart));
  }, [cart]);

  return (
    <>
      {!cart?.length && (
        <EmptyBox
          shopLink
          message={emptyCartMsg}
          divStyle={classes.emptyCrtMsg}
        />
      )}

      {cart.length > 0 && (
        <div className={classes.cart}>
          <ul>
            <CartItem
              cart={cart}
              removeHandler={(id) => handleRemoveItem(id)}
              increaseHandler={(prod) => increaseItemHandler(prod)}
              decreaseHandler={(prod) => decreaseItemHandler(prod)}
            />
          </ul>

          <div className={classes.totalPrice}>
            Total: &#8358;
            {cartTotalPrice
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </div>

          <div className={classes.cartFooter}>
            <ShopLink name="Continue shopping" />

            <CheckoutLink />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
