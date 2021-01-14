import React from 'react';

import nookies from 'nookies';
import Payment from '../../components/payment';
import classes from './checkout.module.scss';

const Checkout = () => {
  return (
    <div className={classes.checkout}>
      <div className={classes.wrapper}>
        <header>
          <h1>Checkout</h1>
        </header>

        <Payment />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {},
  };
}

export default Checkout;
