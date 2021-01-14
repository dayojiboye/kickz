import React from 'react';

import { Select } from 'antd';

const categorySelect = ({ handleChange, defaultValue }) => {
  const { Option } = Select;

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 120, fontSize: '1rem' }}
      onChange={handleChange}
      bordered={false}
    >
      <Option value="">Show All</Option>
      <Option value="women">Women</Option>
      <Option value="men">Men</Option>
    </Select>
  );
};

export default categorySelect;
