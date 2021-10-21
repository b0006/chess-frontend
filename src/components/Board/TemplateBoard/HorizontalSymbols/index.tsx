import React from 'react';

import { HORIZONTAL_SYMBOLS, HORIZONTAL_SYMBOLS_REVERSE } from '../../constants';

import styles from './HorizontalSymbols.module.scss';

interface IProps {
  isRotate?: boolean;
}

const HorizontalSymbols: React.FC<IProps> = ({ isRotate }) => {
  const list = isRotate ? HORIZONTAL_SYMBOLS_REVERSE : HORIZONTAL_SYMBOLS;

  return (
    <div className={styles['horizontal-panel']}>
      {list.map((sym) => (
        <div className={styles['alphabet-symbol']} key={sym}>
          {sym.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export { HorizontalSymbols };
