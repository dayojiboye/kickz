import React, { Fragment } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

const ActiveLink = ({ href, name, as, extra }) => {
  const router = useRouter();

  const style = {
    background:
      router.pathname === href || router.pathname === href + '/[category]'
        ? '#435b74'
        : null,
  };

  return (
    <Fragment>
      <Link href={href} as={as}>
        <a style={style}>
          {name} {extra}
        </a>
      </Link>
    </Fragment>
  );
};

export default ActiveLink;
