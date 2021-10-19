import React from 'react';
import cn from 'classnames';

import { HORIZONTAL_SYMBOLS } from '../constants';

import styles from './HorizontalSymbols.module.scss';

interface IProps {
  isRotate?: boolean;
}

const HorizontalSymbols: React.FC<IProps> = ({ isRotate }) => {
  return (
    <div className={styles['horizontal-panel']}>
      {HORIZONTAL_SYMBOLS.map((sym) => (
        <div
          className={cn(styles['alphabet-symbol'], {
            [styles['alphabet-symbol--rotate']]: isRotate,
          })}
          key={sym}
        >
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export { HorizontalSymbols };
