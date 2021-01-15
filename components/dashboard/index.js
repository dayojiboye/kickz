import React from 'react';

import moment from 'moment';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import classes from './dashboard.module.scss';

const dashboard = ({ orders, isLoading }) => {
  const router = useRouter();

  const columns = [
    {
      title: 'Order Date',
      dataIndex: 'orderCreatedDate',
      key: 'orderCreatedDate',
      render: (text, record) => (
        <span>
          {moment(record.orderCreatedDate.toDate()).format('DD/MM/YYYY')}
        </span>
      ),
    },
    {
      title: 'Order ID',
      dataIndex: 'documentID',
      key: 'documentID',
    },
    {
      title: 'Amount',
      dataIndex: 'orderTotal',
      key: 'orderTotal',
      render: (text, record) => (
        <span>
          &#8358;
          {record.orderTotal
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </span>
      ),
    },
  ];

  return (
    <div className={classes.dashboard}>
      <Table
        dataSource={orders}
        columns={columns}
        loading={isLoading}
        rowKey="documentID"
        className={classes.table}
        pagination={false}
        scroll={{ x: 180 }}
        size="small"
        onRow={(record) => {
          return {
            onClick: () => {
              router.push({
                pathname: '/order',
                query: { id: record.documentID },
              });
            },
          };
        }}
      />
    </div>
  );
};

export default dashboard;
