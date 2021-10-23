import React from 'react';
import cn from 'classnames';

import { Placement } from '../types';

import styles from './NotificationLayout.module.scss';

interface Props {
  placement?: Placement;
}

const NotificationLayout: React.FC<Props> = ({ placement = 'top-right', children }) => {
  return <div className={cn(styles.layout, styles[placement])}>{children}</div>;
};

export { NotificationLayout };
