import React from 'react';

import { Form, Select, Input, InputNumber } from 'antd';

const productForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical" name="product_form">
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: 'Please choose a category!' }]}
        hasFeedback
      >
        <Select>
          <Select.Option value="men">Men</Select.Option>
          <Select.Option value="women">Women</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a name!' }]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="thumbnail"
        label="Image Url"
        rules={[{ required: true, message: 'Please enter an image url!' }]}
        hasFeedback
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter a price!' }]}
        hasFeedback
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Description"
        name="desc"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please enter a description for the product!',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
};

export default productForm;
