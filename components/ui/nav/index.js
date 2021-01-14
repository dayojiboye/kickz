import React, { useEffect, useState } from 'react';

import * as actions from '../../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { totalCartItems } from '../../../utils/cart.helpers';
import classes from './nav.module.scss';

// nav links
import HomeLink from '../links/homeLink';
import ShopLink from '../links/shopLink';
import CartLink from '../links/cartLink';
import LoginLink from '../links/loginLink';
import SignupLink from '../links/signupLink';
import AccountLink from '../links/accountLink';

const Nav = () => {
  const [cartTotal, setcartTotal] = useState(0);

  const dispatch = useDispatch();

  const { user, cart } = useSelector((state) => {
    return {
      user: state.auth.currentUser,
      cart: state.cart.cart,
    };
  });

  const signUserOut = () => {
    dispatch(actions.signout());
  };

  useEffect(() => {
    if (cart?.length) {
      const total = totalCartItems(cart);
      setcartTotal(total);
    } else {
      setcartTotal(0);
    }
  }, [cart]);

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <HomeLink />
        </li>

        <li>
          <ShopLink name="Shop" />
        </li>

        <li>
          <CartLink badgeClass={classes.badge}>{cartTotal}</CartLink>
        </li>

        <li>
          {user && <AccountLink />}
          {!user && <LoginLink name="Log in" />}
        </li>

        <li>
          {user && <span onClick={signUserOut}>Log out</span>}
          {!user && <SignupLink />}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
