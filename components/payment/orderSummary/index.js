import React from 'react';

import Products from './products';
import { useSelector } from 'react-redux';
import { totalCartPrice } from '../../../utils/cart.helpers';
import { Row, Col } from 'antd';
import classes from './summary.module.scss';

const OrderSummary = () => {
  const { shippingInfo, cart } = useSelector((state) => {
    return {
      shippingInfo: state.payment.shippingInfo,
      cart: state.cart.cart,
    };
  });

  const totalPrice = totalCartPrice(cart);

  return (
    <div className={classes.orderSummary}>
      <h2>Order Summary</h2>

      <Products cart={cart} />

      <Row justify="space-between" className={classes.orderTotal}>
        <Col span={12}>Total</Col>
        <Col span={10} className={classes.total}>
          &#8358;
          {totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Col>
      </Row>

      <Row justify="space-between">
        <Col span={12}>Shipping Details</Col>
        <Col span={10} className={classes.info}>
          <span>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </span>

          <br />

          <span>
            {shippingInfo.address}, {shippingInfo.city},
          </span>

          <br />

          <span>{shippingInfo.state}.</span>

          <br />

          <span>{shippingInfo.email}</span>
        </Col>
      </Row>
    </div>
  );
};

export default OrderSummary;
