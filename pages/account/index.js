import React, { useEffect } from 'react';

import nookies from 'nookies';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'antd';
import { UserOutlined, FolderOpenFilled } from '@ant-design/icons';
import Dashboard from '../../components/dashboard';
import classes from './account.module.scss';

const Account = () => {
  const dispatch = useDispatch();

  const { currentUser, orderHistory, loading } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
      orderHistory: state.orders.orderHistory,
      loading: state.orders.loading,
    };
  });

  useEffect(() => {
    dispatch(actions.setUserOrder(currentUser.uid));

    return () => dispatch(actions.setUserOrderHistory(null));
  }, []);

  return (
    <div className={classes.account}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Avatar shape="square" size={150} icon={<UserOutlined />} />

          <div className={classes.user}>
            {currentUser && <h1>{currentUser.displayName}</h1>}
            {currentUser && <span>{currentUser.email}</span>}
          </div>
        </div>

        <h2>
          <FolderOpenFilled />
          Order History
        </h2>

        <div className={classes.orders}>
          <Dashboard
            orders={orderHistory ? orderHistory.data : []}
            isLoading={loading}
          />
        </div>
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

export default Account;
