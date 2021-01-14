import React from 'react';

import { Button, Popconfirm } from 'antd';

import Image from 'next/image';

import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

import classes from './cartItem.module.scss';

const cartItem = ({
  cart,
  removeHandler,
  increaseHandler,
  decreaseHandler,
}) => {
  return cart.map((item) => {
    const { name, thumbnail, price, quantity, documentID } = item;

    const itemPrice = price * quantity;

    return (
      <li key={documentID}>
        <div className={classes.cartItem}>
          <div className={classes.image}>
            {/* <img src={thumbnail} alt={name} /> */}

            <Image
              src={thumbnail}
              alt={name}
              width={400}
              height={280}
              objectFit="cover"
              quality={100}
            />
          </div>

          <div className={classes.content}>
            <h3>{name}</h3>

            <span>
              &#8358;
              {itemPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
            </span>
          </div>
        </div>

        <div className={classes.actions}>
          <div className={classes.remove}>
            <Popconfirm
              title="Sure to delete item from cart?"
              onConfirm={() => removeHandler(documentID)}
            >
              <Button type="primary" className={classes.removeBtn}>
                <DeleteOutlined />
                Remove
              </Button>
            </Popconfirm>
          </div>

          <div className={classes.itemQuantity}>
            <Button
              type="primary"
              disabled={quantity === 1}
              onClick={() => decreaseHandler(item)}
            >
              <MinusCircleOutlined />
            </Button>

            <span className={classes.quantity}>{quantity}</span>

            <Button
              type="primary"
              onClick={() =>
                increaseHandler({
                  ...item,
                  quantity: 1,
                })
              }
            >
              <PlusCircleOutlined />
            </Button>
          </div>
        </div>
      </li>
    );
  });
};

export default cartItem;
