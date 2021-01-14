import React from 'react';

import Pagination from '../ui/pagination';
import Select from './categorySelect';
import Products from './productsComp';
import LoadingProducts from './loadingProducts';
import classes from './shop.module.scss';

const shop = ({
  heading,
  defaultValue,
  handleChange,
  products,
  clicked,
  isLastPage,
  loading
}) => {
  const paginationConfig = {
    clicked,
    isLastPage,
  };

  return (
    <div className={classes.shop}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h1>{heading}</h1>
        </div>

        <div className={classes.selectFilter}>
          <Select handleChange={handleChange} defaultValue={defaultValue} />
        </div>

        {loading && <LoadingProducts />}

        {!loading && <Products products={products} />}

        <Pagination {...paginationConfig} />
      </div>
    </div>
  );
};

export default shop;
