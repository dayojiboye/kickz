import React from 'react';

import { useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import { Table, Popconfirm, Button, message } from 'antd';
import classes from './productsTable.module.scss';

const ProductsTable = ({ products, loading }) => {
  const dispatch = useDispatch();

  const deleteProduct = (documentID) => {
    dispatch(actions.deleteProduct(documentID));

    message.success('Product deleted!');
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      filters: [
        {
          text: 'Men',
          value: 'men',
        },
        {
          text: 'Women',
          value: 'women',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record) => (
        <img
          src={record.thumbnail}
          alt={record.name}
          className={classes.prodImage}
        />
      ),
      width: 100,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '30%',
      render: (text, record) => (
        <span>
          &#8358;{' '}
          {record.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['ascend'],
    },
    {
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => deleteProduct(record.documentID)}
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="documentID"
        className={classes.table}
        pagination={false}
        scroll={{ x: 1500 }}
        loading={loading}
      />
      <span className={classes.more}>
        Scroll horizontally to see more details
      </span>
    </>
  );
};

export default ProductsTable;
