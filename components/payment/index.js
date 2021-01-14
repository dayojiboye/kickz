import React, { useState, useEffect } from 'react';

import { Steps, Divider, Button } from 'antd';
import { PaystackButton } from 'react-paystack';
import { useRouter } from 'next/router';

import Form from './paymentForm';
import OrderSummary from './orderSummary';
import EmptyBox from '../ui/emptyBox';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { totalCartPrice } from '../../utils/cart.helpers';
import classes from './payment.module.scss';

const { Step } = Steps;

const steps = [
  {
    title: 'Shipping Address',
    content: <Form />,
  },
  {
    title: 'Review Order',
    content: <OrderSummary />,
  },
];

const Payment = () => {
  const publicKey = 'pk_test_01dc6ab23883df5ab2ca109c067e5c042e6dcfa0';

  const [current, setCurrent] = useState(0);

  const dispatch = useDispatch();

  const router = useRouter();

  const { shippingInfo, cart } = useSelector((state) => {
    return {
      shippingInfo: state.payment.shippingInfo,
      cart: state.cart.cart,
    };
  });

  const emptyCartMsg = 'No product in your cart. Add some product(s) now!';

  const amount = totalCartPrice(cart);

  const configOrder = {
    orderTotal: amount,
    orderItems: cart.map((item) => {
      const { documentID, thumbnail, name, price, quantity } = item;

      return {
        documentID,
        thumbnail,
        name,
        price,
        quantity,
      };
    }),
  };

  const orderSuccess = () => {
    dispatch(actions.saveUserOrder(configOrder));
  };

  const paystackProps = shippingInfo
    ? {
        email: shippingInfo.email,
        amount: amount * 100,
        publicKey,
        text: 'Pay Now',
        onSuccess: () => orderSuccess(),
      }
    : null;

  const nextBtnStyle = [classes.nextBtn, shippingInfo ? classes.popup : null];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (!cart?.length) {
      router.replace('/');
    }
  }, [cart]);

  return (
    <>
      {!cart?.length && (
        <EmptyBox message={emptyCartMsg} divStyle={classes.emptyCrtMsg} />
      )}

      {cart.length > 0 && (
        <div className={classes.payment}>
          <Steps current={current} labelPlacement="vertical" size="small">
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          {steps[current].content}

          <Divider />

          <div className={classes.stepsAction}>
            {current < steps.length - 1 && (
              <Button
                type="primary"
                disabled={!shippingInfo}
                className={nextBtnStyle.join(' ')}
                onClick={next}
              >
                Next
              </Button>
            )}

            {current > 0 && (
              <Button type="primary" className={classes.prevBtn} onClick={prev}>
                Previous
              </Button>
            )}

            {current === steps.length - 1 && (
              <PaystackButton
                className={classes.paystackBtn}
                {...paystackProps}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
