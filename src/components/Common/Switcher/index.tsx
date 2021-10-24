import React from 'react';

import styles from './Switcher.module.scss';

interface Props {
  value?: boolean;
  onChange?: (value: boolean) => void;
}

const Switcher = React.forwardRef((props: Props, ref?: React.LegacyRef<HTMLInputElement>) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof props.onChange === 'function') {
      props.onChange(event.target.checked);
    }
  };

  return (
    <label className={styles.switch}>
      <input ref={ref} className={styles.input} type="checkbox" checked={props.value} onChange={onInputChange} />
      <span className={styles.slider} />
    </label>
  );
});

Switcher.displayName = 'Switcher';

export { Switcher };
