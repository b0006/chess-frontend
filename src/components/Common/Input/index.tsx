import React, { useState } from 'react';
import cn from 'classnames';

import { SvgIcon } from '../SvgIcon';

import styles from './Input.module.scss';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string;
  placeholder?: string;
  label?: string;
  isSuccess?: boolean;
  description?: string;
}

const Input = React.forwardRef((props: Props, ref?: React.LegacyRef<HTMLInputElement>) => {
  const {
    className,
    label,
    errorText,
    placeholder,
    onFocus,
    onBlur,
    value,
    isSuccess,
    description,
    disabled,
    ...rest
  } = props;

  const [isLabelTop, setIsLabelTop] = useState(false);

  const onFocusInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    setIsLabelTop(true);

    if (onFocus) {
      onFocus(event);
    }
  };

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    if (event.target.value === '') {
      setIsLabelTop(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <label className={styles.inner}>
        {label && (
          <span
            className={cn(styles.label, {
              [styles.label_focus]: isLabelTop || value,
              [styles.label_disabled]: disabled,
            })}
          >
            {label}
          </span>
        )}
        <input
          className={cn(styles.input, {
            [styles.input_error]: errorText && !disabled,
            [styles['input_without-label']]: !label,
            [styles.input_success]: isSuccess && !disabled,
          })}
          type="text"
          ref={ref}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          {...rest}
        />
        {isSuccess && !disabled && <SvgIcon className={styles.icon} kind="checked" />}
        {errorText && !isSuccess && !disabled && <span className={styles.error}>{errorText}</span>}
      </label>
      {description && <span className={styles.description}>{description}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
