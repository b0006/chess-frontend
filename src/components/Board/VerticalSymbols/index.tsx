import React from 'react';
import cn from 'classnames';

import { VERTICAL_SYMBOLS_REVERSE } from '../constants';

import styles from './VerticalSymbols.module.scss';

interface IProps {
  isRotate?: boolean;
}

const VerticalSymbols: React.FC<IProps> = ({ isRotate }) => {
  return (
    <div className={styles['vertical-panel']}>
      {VERTICAL_SYMBOLS_REVERSE.map((sym) => (
        <div
          className={cn(styles['digit-symbol'], {
            [styles['digit-symbol--rotate']]: isRotate,
          })}
          key={sym}
        >
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export { VerticalSymbols };
