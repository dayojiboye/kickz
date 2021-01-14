import React from 'react';
import classes from './header.module.scss';

import Nav from '../nav';

const header = (props) => {
  return (
    <header className={classes.header}>
      <Nav />
    </header>
  );
};

export default header;
