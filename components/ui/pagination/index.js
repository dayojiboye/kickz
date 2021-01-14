import React from 'react';

import { Button } from 'antd';
import classes from './pagination.module.scss';

const pagination = ({ clicked, isLastPage }) => {
  return (
    <div className={classes.pagination}>
      <Button
        onClick={clicked}
        disabled={isLastPage}
        className={classes.loadButton}
      >
        Load More
      </Button>
    </div>
  );
};

export default pagination;
