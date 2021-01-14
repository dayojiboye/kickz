import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import classes from './productCards.module.scss';

const ProductCards = ({ thumbnail, name, price, documentID }) => {
  if (!documentID || !thumbnail || !name || typeof price === 'undefined')
    return null;

  return (
    <Link href={{ pathname: `/product`, query: { id: documentID } }}>
      <a className={classes.card}>
        <div className={classes.cardImage}>
          <Image
            src={thumbnail}
            alt={name}
            width={300}
            height={250}
            quality={100}
            objectFit="cover"
            layout="responsive"
          />
        </div>

        <div className={classes.cardDetails}>
          <span className={classes.name}>{name}</span>

          <span className={classes.price}>
            &#8358;{price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default ProductCards;
