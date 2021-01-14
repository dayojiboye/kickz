import React, { useState, useEffect, Fragment } from 'react';

import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { Form, Input, Button, Tooltip, Alert } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import classes from './signup.module.scss';

const Signup = (props) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser, error, loading } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
      error: state.auth.error,
      loading: state.auth.loading,
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

  const onFinish = (values) => {
    const { email, password, displayName } = values;

    dispatch(actions.signup({ email, password, displayName }));
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

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
          name="displayName"
          label={
            <span>
              Username&nbsp;
              <Tooltip title="How do you want to be addressed?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: 'Please enter a username!',
              whitespace: true,
            },
            {
              min: 4,
              message: 'Username must be at least 4 characters long!',
            },
          ]}
          className={classes.formItem}
          hasFeedback
        >
          <Input
            className={classes.input}
            prefix={<UserOutlined className={classes.icon} />}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
        </Form.Item>

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

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          className={classes.formItem}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}
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
              {!loading && <>Register</>}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default Signup;
