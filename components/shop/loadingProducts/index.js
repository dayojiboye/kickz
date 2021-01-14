import React from 'react';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './loadingProducts.module.scss';

const loadingProducts = () => {
  const antIcon = <LoadingOutlined className={classes.loadingIcon} spin />;

  return (
    <div className={classes.loading}>
      <Spin indicator={antIcon} />
    </div>
  );
};

export default loadingProducts;
