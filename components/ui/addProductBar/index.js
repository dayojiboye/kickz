import React from 'react';

import { Button } from 'antd';
import classes from './addProductBar.module.scss';

const addProductBar = ({ clicked }) => {
  return (
    <div className={classes.addProductBar}>
      <Button type="primary" onClick={clicked}>
        Add Product
      </Button>
    </div>
  );
};

export default addProductBar;
