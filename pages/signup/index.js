import React from 'react';

import nookies from 'nookies';
import LoginLink from '../../components/ui/links/loginLink';
import SignupForm from '../../components/signup';
import classes from './signup.module.scss';

const Signup = () => {
  return (
    <div className={classes.signup}>
      <div className={classes.wrapper}>
        <div className={classes.welcomeBox}>
          <h1>Get Started!</h1>
          <p>Create a new account</p>
        </div>

        <SignupForm />

        <div className={classes.footerBox}>
          <small>
            Existing user? <LoginLink name="Log in" /> here
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

export default Signup;
