import React, { useState, useEffect } from 'react';

import { Form, Input, Button, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';
import classes from './form.module.scss';

const PaymentForm = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => {
    return {
      shippingInfo: state.payment.shippingInfo,
    };
  });

  const onFinish = (values) => {
    dispatch(
      actions.setShippingInfo({
        ...values,
      })
    );

    message.success('SHIPPING ADDRESS SUBMITTED SUCCESSFULLY!');
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <>
      <h2>Shipping Address</h2>

      <Form
        form={form}
        layout="vertical"
        name="basic"
        size="large"
        onFinish={onFinish}
        initialValues={shippingInfo}
        className={classes.form}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please enter your first name!',
              whitespace: true,
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input className={classes.input} />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please enter your last name!',
              whitespace: true,
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input className={classes.input} />
        </Form.Item>

        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The e-mail address you entered is not valid!',
            },
            {
              required: true,
              message: 'Please enter your e-mail address!',
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input className={classes.input} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please enter your shipping address!',
              whitespace: true,
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input className={classes.input} />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: 'Please enter your city!',
              whitespace: true,
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input className={classes.input} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="state"
              label="State"
              rules={[
                {
                  required: true,
                  message: 'Please enter your state!',
                  whitespace: true,
                },
              ]}
              className={classes.formItem}
              hasFeedback
            >
              <Input className={classes.input} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="postal"
              label="Postal Code"
              rules={[
                {
                  required: true,
                  message: 'Please enter your postal code!',
                  whitespace: true,
                },
                {
                  min: 5,
                  message: 'Postal code must be at least 5 characters long!',
                },
              ]}
              className={classes.formItem}
              hasFeedback
            >
              <Input className={classes.input} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item className={classes.buttonWrapper} shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default PaymentForm;
