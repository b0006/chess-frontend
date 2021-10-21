import React from 'react';
import cn from 'classnames';

import { SvgIcon } from '../SvgIcon';

import styles from './Checkbox.module.scss';

export interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  isError?: boolean;
  disabled?: boolean;
}

const Checkbox = React.forwardRef((props: IProps, ref?: React.LegacyRef<HTMLInputElement>) => {
  const { label, className, isError, disabled, ...rest } = props;

  return (
    <label
      className={cn(styles.wrapper, className, {
        [styles.wrapper_error]: isError && !disabled,
        [styles.wrapper_disabled]: disabled,
      })}
    >
      <input disabled={disabled} ref={ref} type="checkbox" className={styles.input} {...rest} />
      <div className={styles.checkmark}>
        <SvgIcon kind="checked" className={styles.icon} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
