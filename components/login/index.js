import React, { useState, useEffect, Fragment } from 'react';

import { useRouter } from 'next/router';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import classes from './login.module.scss';

const Login = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser, loading, error } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
      loading: state.auth.loading,
      error: state.auth.error,
    };
  });

  const alertDismiss = () => {
    dispatch(actions.authError(null));
  };

  const onInputFocus = (e) => {
    e.target.closest('span').querySelector('.anticon').style.color = 'black';

    if (error) alertDismiss();
  };

  const onInputBlur = (e) => {
    e.target.closest('span').querySelector('.anticon').style.color = '#ccc';
  };

  const onFinish = async (values) => {
    dispatch(actions.signin(values));
  };

  // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  // dismiss error alert after 3 seconds

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        alertDismiss();
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    if (currentUser && currentUser.userRoles) router.replace('/account');
  }, [currentUser]);

  return (
    <Fragment>
      {error ? (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          afterClose={alertDismiss}
          className={classes.alert}
        />
      ) : null}
      <Form
        form={form}
        layout="vertical"
        name="basic"
        size="large"
        onFinish={onFinish}
        className={classes.form}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Email you entered is not valid!',
            },
            {
              required: true,
              message: 'Please enter your Email!',
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input
            className={classes.input}
            prefix={<MailOutlined className={classes.icon} />}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your Password!',
            },
            {
              min: 6,
              message: 'Password must be at least 6 characters long!',
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input.Password
            className={classes.input}
            prefix={<LockOutlined className={classes.icon} />}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
        </Form.Item>

        <Form.Item className={classes.buttonWrapper} shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              {!loading && <>Log in</>}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Login;
