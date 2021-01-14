import React from 'react';

import { Empty } from 'antd';
import ShopLink from '../links/shopLink';

const emptyBox = ({ divStyle, message, shopLink }) => {
  return (
    <div className={divStyle}>
      <Empty description={message} />
      {shopLink ? <ShopLink name="Shop Now" /> : null}
    </div>
  );
};

export default emptyBox;
