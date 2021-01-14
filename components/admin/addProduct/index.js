import React, { useState } from 'react';

import * as actions from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import { Form, message } from 'antd';
import AddProductBar from '../../ui/addProductBar';
import Modal from '../../ui/modal';
import ProductForm from './productForm';

const AddProduct = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onCreate = (values) => {
    dispatch(actions.addProduct({ ...values }));
    setVisible(false);
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
        dispatch(actions.fetchProducts(true));
        message.success('Product added!');
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <AddProductBar clicked={openModal} />

      <Modal
        visible={visible}
        title="ADD NEW PRODUCT"
        okText="Submit"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onOk}
      >
        <ProductForm form={form} />
      </Modal>
    </>
  );
};

export default AddProduct;
