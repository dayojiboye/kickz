import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import { useRouter } from 'next/router';
import ShopComponent from '../../components/shop';

const Categories = () => {
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();

  const { products, loading } = useSelector((state) => {
    return {
      products: state.products.products,
      loading: state.products.loading,
    };
  });

  const { data, latestDoc, isLastPage } = products;

  const handleChange = (value) => {
    const filter = value;

    router.push(`/shop/${filter}`);
  };

  const loadMore = () => {
    dispatch(actions.fetchProducts(false, category, latestDoc, data));
  };

  useEffect(() => {
    dispatch(actions.fetchProducts(true, category));
  }, []);

  return (
    <ShopComponent
      heading={`Shop ${category} Shoes`}
      handleChange={handleChange}
      defaultValue={category}
      products={data}
      clicked={loadMore}
      isLastPage={isLastPage}
      loading={loading}
    />
  );
};

export async function getStaticPaths() {
  const paths = [
    { params: { category: 'women' } },
    { params: { category: 'men' } },
  ];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const key = params.category;

  return {
    props: {
      key,
    },
  };
}

export default Categories;
