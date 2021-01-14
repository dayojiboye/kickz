import React, { useEffect } from 'react';

import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import AddProduct from '../../components/admin/addProduct';
import ProductsTable from '../../components/admin/productsTable';
import Pagination from '../../components/ui/pagination';
import nookies from 'nookies';

import classes from './admin.module.scss';

const Admin = () => {
  const { products, loading } = useSelector((state) => {
    return {
      products: state.products.products,
      loading: state.products.loading,
    };
  });

  const { data, latestDoc, isLastPage } = products;

  const dispatch = useDispatch();

  const loadMore = () => {
    dispatch(actions.fetchProducts(false, null, latestDoc, data));
  };

  useEffect(() => {
    dispatch(actions.fetchProducts(true));
  }, []);

  return (
    <div className={classes.admin}>
      <div className={classes.wrapper}>
        <AddProduct />

        <ProductsTable products={data} loading={loading} />

        <Pagination clicked={loadMore} isLastPage={isLastPage} />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  if (!cookies.token || !cookies.uROu) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    };
  }

  return {
    props: {},
  };
}

export default Admin;
