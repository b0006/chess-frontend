import React from 'react';
import cn from 'classnames';

import styles from './Switcher.module.scss';

const Switcher = React.forwardRef(
  (props: React.InputHTMLAttributes<HTMLInputElement>, ref?: React.LegacyRef<HTMLInputElement>) => {
    const { className, ...rest } = props;
    return (
      <label className={cn(styles.switch, className)}>
        <input ref={ref} className={styles.input} type="checkbox" {...rest} />
        <span className={styles.slider} />
      </label>
    );
  }
);

Switcher.displayName = 'Switcher';

export { Switcher };
