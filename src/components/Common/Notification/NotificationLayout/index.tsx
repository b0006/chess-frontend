import React from 'react';
import cn from 'classnames';

import { TPlacement } from '../types';

import styles from './NotificationLayout.module.scss';

interface IProps {
  placement?: TPlacement;
}

const NotificationLayout: React.FC<IProps> = ({ placement = 'top-right', children }) => {
  return <div className={cn(styles.layout, styles[placement])}>{children}</div>;
};

export { NotificationLayout };
