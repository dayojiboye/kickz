import React from 'react';

import nookies from 'nookies';
import SignUpLink from '../../components/ui/links/signupLink';
import LoginForm from '../../components/login';
import classes from './login.module.scss';

const Login = () => {
  return (
    <div className={classes.login}>
      <div className={classes.wrapper}>
        <div className={classes.welcomeBox}>
          <h1>Log in with your email and password!</h1>
        </div>

        <LoginForm />

        <div className={classes.footerBox}>
          <small>
            New user? <SignUpLink /> here
          </small>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
