import React from 'react';

import ProductCards from './productCards';
import classes from './productsComp.module.scss';

const ProductsComp = ({ products }) => {
  if (!Array.isArray(products)) return null;

  return (
    <div className={classes.products}>
      {products.map((product, index) => {
        const { thumbnail, name, price, documentID } = product;

        if (!documentID || !thumbnail || !name || typeof price === 'undefined') return null;

        return (
          <ProductCards
            key={index}
            thumbnail={thumbnail}
            name={name}
            price={price}
            documentID={documentID}
          />
        );
      })}
    </div>
  );
};

export default ProductsComp;
