import React from 'react';

import { useRouter } from 'next/router';
import { Result, Button } from 'antd';

import classes from './404.module.scss';

export default function CustomError() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className={classes.error}>
      <div className={classes.wrapper}>
        <Result
          className={classes.result}
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              className={classes.errorBtn}
              onClick={goBack}
            >
              Go Back
            </Button>
          }
        />
      </div>
    </div>
  );
}
