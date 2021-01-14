import React from 'react';

import { Table } from 'antd';
import Image from 'next/image';
import classes from './order.module.scss';

const orderTable = ({ order, isLoading }) => {
  const columns = [
    {
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record) => (
        <Image
          src={record.thumbnail}
          alt={record.name}
          width={300}
          height={250}
          quality={100}
          objectFit="cover"
          layout="responsive"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <span>
          &#8358;
          {record.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </span>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  return (
    <div className={classes.order}>
      <Table
        dataSource={order}
        columns={columns}
        rowKey="documentID"
        className={classes.table}
        pagination={false}
        scroll={{ x: 900 }}
        loading={isLoading}
      />
    </div>
  );
};

export default orderTable;
