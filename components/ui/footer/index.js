import React from 'react';

import classes from './footer.module.scss';

const footer = (props) => {
  const year = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <span>Copyright &copy; {year}</span>
      </div>
    </footer>
  );
};

export default footer;
