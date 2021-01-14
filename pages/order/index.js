import React, { useEffect } from 'react';

import nookies from 'nookies';
import { useRouter } from 'next/router';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import OrderTable from '../../components/order';
import classes from './order.module.scss';

const Order = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { details, loading } = useSelector((state) => {
    return {
      details: state.orders.orderDetails,
      loading: state.orders.loading,
    };
  });

  useEffect(() => {
    dispatch(actions.fetchOrderDetails(router.query.id));

    return () => dispatch(actions.setOrderDetails(null));
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h1>ORDER ID: #{router.query.id}</h1>
        </div>

        <OrderTable
          order={details ? details.orderItems : []}
          isLoading={loading}
        />

        {details && (
          <div className={classes.total}>
            Total: &#8358;
            {details.orderTotal
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </div>
        )}
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
        destination: '/404',
      },
    };
  }

  return {
    props: {},
  };
}

export default Order;
