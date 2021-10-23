import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { SvgIcon, ICON_LIST } from '../SvgIcon';

import styles from './Button.module.scss';

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Текст кнопки */
  text?: string;
  /** Состояние загрузки */
  isLoading?: boolean;
  /** Иконка */
  icon?: keyof typeof ICON_LIST;
  /** Положение иконки относительно текста */
  iconSide?: 'left' | 'right';
  /** Кнопка в виде круга (только с иконкой) */
  isCircle?: boolean;
  /** Стиль кнопки */
  theme?: 'primary' | 'primary-white' | 'secondary' | 'secondary-white' | 'flat' | 'flat-white';
  /** Кнопка в виде ссылки */
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      text,
      className,
      disabled,
      isLoading,
      isCircle,
      icon,
      iconSide = 'left',
      theme = 'primary',
      type = 'button',
      href,
      ...rest
    },
    ref
  ) => {
    if (typeof icon === 'undefined' && typeof text === 'undefined') {
      return null;
    }

    const iconLeftSide = iconSide === 'left';
    const iconRightSide = iconSide === 'right';

    const classesIcon = cn(styles.icon, {
      [styles.icon_left]: iconLeftSide && text,
      [styles.icon_right]: iconRightSide && text,
      [styles.icon_only]: isCircle,
      [styles.icon_loading]: isLoading,
    });

    const svgIconLoader = <SvgIcon className={classesIcon} kind="loader" />;
    const svgIcon = icon && <SvgIcon kind={icon} className={classesIcon} />;

    const currentIcon = isLoading ? svgIconLoader : svgIcon;

    const button = (
      <button
        className={cn(styles.button, className, styles[`button_${theme}`], {
          [styles.button_circle]: isCircle,
        })}
        type={type}
        disabled={isLoading || disabled}
        ref={ref}
        {...rest}
      >
        {isCircle ? (
          svgIcon
        ) : (
          <React.Fragment>
            {iconLeftSide && currentIcon}
            {text && <span>{text}</span>}
            {iconRightSide && currentIcon}
          </React.Fragment>
        )}
      </button>
    );

    return href ? (
      <Link to={href} className={styles.link}>
        {button}
      </Link>
    ) : (
      button
    );
  }
);

Button.displayName = 'Button';

export { Button };
