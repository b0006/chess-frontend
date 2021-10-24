import React from 'react';
import cn from 'classnames';

import { SvgIcon } from '../../SvgIcon';
import { Option } from '..';

import styles from './SelectOption.module.scss';

interface IProps {
  isOpen: boolean;
  option: Option;
  activeOption: Option | null;
  onChange: () => void;
}

const SelectOption: React.FC<IProps> = ({ isOpen, option, activeOption, onChange }) => (
  <li
    className={cn(styles.item, {
      [styles.item_active]: option.value === activeOption?.value,
    })}
  >
    <button tabIndex={isOpen ? 0 : -1} type="button" onClick={onChange} className={styles['item-button']}>
      {option.label}
    </button>
    {option.value === activeOption?.value && <SvgIcon kind="checked" className={styles['icon-active']} />}
  </li>
);

export { SelectOption };
