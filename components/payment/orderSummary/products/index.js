import React from 'react';

import { Row, Col } from 'antd';
import classes from './products.module.scss';

const products = ({ cart }) => {
  let prods = cart.map((item) => {
    return (
      <Row key={item.name} justify="space-between" gutter={[, 24]}>
        <Col span={12} className={classes.prodImage}>
          <img src={item.thumbnail} alt={item.name} />
        </Col>

        <Col span={10} className={classes.prodInfo}>
          <span>Name: {item.name}</span>
          <span>
            Price: &#8358;
            {item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </span>
          <span>Qty: {item.quantity}</span>
        </Col>
      </Row>
    );
  });

  return cart ? <div className={classes.prods}>{prods}</div> : null;
};

export default products;
