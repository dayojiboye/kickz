import React, { Fragment } from 'react';

import AdminToolbar from '../../components/ui/adminToolbar';
import classes from './layout.module.scss';

import Header from '../../components/ui/header';
import Footer from '../../components/ui/footer';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <AdminToolbar />
      <Header />
      <main className={classes.main}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
