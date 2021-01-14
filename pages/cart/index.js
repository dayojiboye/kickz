import React from 'react';

import CartComponent from '../../components/cart';
import classes from './cart.module.scss';

const Cart = () => {
  return (
    <div className={classes.cart}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h1>CART</h1>
        </div>

        <CartComponent />
      </div>
    </div>
  );
};

export default Cart;
