import React from 'react';

import nookies from 'nookies';
import AdminLink from '../links/adminLink';
import classes from './adminToolbar.module.scss';

const adminToolbar = (props) => {
  const cookies = nookies.get();

  if (!cookies.uROu) return null;

  return (
    <div className={classes.adminToolbar}>
      <AdminLink />
    </div>
  );
};

export default adminToolbar;
