import React from 'react';

import GenderLink from '../ui/links/genderLink';
import classes from './home.module.scss';

const home = (props) => {
  return (
    <div className={classes.homeBody}>
      <div className={classes.women}>
        <GenderLink gender="women" />
      </div>
      <div className={classes.men}>
        <GenderLink gender="men" />
      </div>
    </div>
  );
};

export default home;
