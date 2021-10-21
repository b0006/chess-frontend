import React from 'react';

import { VERTICAL_SYMBOLS_REVERSE, VERTICAL_SYMBOLS } from '../../constants';

import styles from './VerticalSymbols.module.scss';

interface IProps {
  isRotate?: boolean;
}

const VerticalSymbols: React.FC<IProps> = ({ isRotate }) => {
  const list = isRotate ? VERTICAL_SYMBOLS : VERTICAL_SYMBOLS_REVERSE;

  return (
    <div className={styles['vertical-panel']}>
      {list.map((sym) => (
        <div className={styles['digit-symbol']} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export { VerticalSymbols };
