import React from 'react';

import { Modal } from 'antd';
import classes from './modal.module.scss';

const modal = ({
  visible,
  title,
  children,
  okText,
  cancelText,
  onCancel,
  onOk,
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={onOk}
      className={classes.modal}
      centered
    >
      {children}
    </Modal>
  );
};

export default modal;
