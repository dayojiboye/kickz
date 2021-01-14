import React, { useState } from 'react';

import * as actions from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { handleFetchProduct } from '../../utils/products.helpers';
import { useRouter } from 'next/router';
import ProductComponent from '../../components/product';

const Product = ({ prod }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState('1');

  const handleInput = (e) => {
    setQuantity(e.target.value);
  };

  const cartBtnHandler = () => {
    dispatch(
      actions.addToCart({
        ...prod,
        quantity: parseInt(quantity),
      })
    );

    router.push('/cart');
  };

  const productConfig = {
    ...prod,
    inputHandler: handleInput,
    buttonHandler: cartBtnHandler,
    quantity: quantity,
  };

  return <ProductComponent {...productConfig} />;
};

export async function getServerSideProps({ query }) {
  const data = await handleFetchProduct(query.id);

  const prod = {
    ...data,
    createdDate: data.createdDate.toDate().toDateString(),
    documentID: query.id,
  };

  return {
    props: { prod },
  };
}

export default Product;
