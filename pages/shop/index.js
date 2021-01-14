import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import { useRouter } from 'next/router';
import ShopComponent from '../../components/shop';

const Shop = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => {
    return {
      products: state.products.products,
      loading: state.products.loading
    };
  });

  const { data, latestDoc, isLastPage } = products;

  const handleChange = (value) => {
    const filter = value;

    router.push(`/shop/${filter}`);
  };

  const loadMore = () => {
    dispatch(actions.fetchProducts(false, null, latestDoc, data));
  };

  useEffect(() => {
    dispatch(actions.fetchProducts(true));
  }, []);

  return (
    <ShopComponent
      heading="Shop All Shoes"
      handleChange={handleChange}
      defaultValue=""
      products={data}
      clicked={loadMore}
      isLastPage={isLastPage}
      loading={loading}
    />
  );
};

export default Shop;
