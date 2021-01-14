import React from 'react';

import { useSelector } from 'react-redux';
import { Button } from 'antd';
import LoginLink from '../ui/links/loginLink';
import classes from './product.module.scss';

const Product = ({
  thumbnail,
  name,
  price,
  desc,
  inputHandler,
  buttonHandler,
  quantity,
}) => {
  const { currentUser } = useSelector((state) => {
    return {
      currentUser: state.auth.currentUser,
    };
  });

  let actionButton = currentUser ? (
    <Button
      type="primary"
      className={classes.actionBtn}
      onClick={buttonHandler}
      disabled={quantity < 1}
    >
      Add to cart
    </Button>
  ) : (
    <LoginLink name="Log in to buy" />
  );

  return (
    <div className={classes.product}>
      <div className={classes.wrapper}>
        <div className={classes.item}>
          <div className={classes.image}>
            <img src={thumbnail} alt={name} />
          </div>

          <div className={classes.content}>
            <div className={classes.details}>
              <span className={classes.name}>{name}</span>
              <span>
                &#8358;
                {price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </span>
            </div>

            <div className={classes.action}>
              <input
                type="number"
                placeholder="0"
                inputMode="numeric"
                max="10"
                min="1"
                value={quantity}
                className={classes.inputNumber}
                onChange={inputHandler}
              />
              {actionButton}
            </div>
          </div>
        </div>

        <div className={classes.about}>
          <h1>{name}</h1>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
