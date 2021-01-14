// import Head from 'next/head'
import React from 'react';

import HomeBody from '../components/home';
import classes from './home.module.scss';

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.wrapper}>
        <HomeBody />
      </div>
    </div>
  );
};

export default Home;
