import React, { useState, useRef } from 'react';
import cn from 'classnames';

import { SlideDownUp } from '../SlideDownUp';
import { SvgIcon } from '../SvgIcon';
import { useOnClickOutside } from '../../../hook/useOnClickOutside.hook';

import { SelectOption } from './SelectOption';
import styles from './Select.module.scss';

export type OptionValue = string | number | null;

export interface Option {
  label: string;
  value: OptionValue;
}

export interface Props {
  className?: string;
  label?: string;
  options: Option[];
  wrapperStyle?: React.CSSProperties;
  isOutsideClickClose?: boolean;
  withEmptyOption?: boolean;
  emptyOptionLabel?: string;
  value?: OptionValue;
  onChange?: (value: OptionValue) => void;
}

const Select: React.FC<Props> = ({
  label,
  wrapperStyle,
  isOutsideClickClose = true,
  value,
  onChange,
  withEmptyOption,
  emptyOptionLabel = '',
  options = [],
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [activeOption, setActiveOption] = useState<Option | null>(
    options.filter((option) => option.value === value)[0]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);

  const onAnimationOpenEnd = (): void => {
    setIsOverflow(true);
  };

  const onToggleList = (): void => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setIsOverflow(false);
    }
  };

  const onCloseList = (): void => {
    setIsOverflow(false);
    setIsOpen(false);
  };

  const onClickOption = (newValue: OptionValue) => (): void => {
    const [findOption = null] = options.filter((option) => option.value === newValue);
    setActiveOption(findOption);
    onCloseList();
    if (onChange) {
      onChange(findOption?.value || null);
    }
  };

  const onOutSideClick = (): void => {
    if (isOutsideClickClose) {
      onCloseList();
    }
  };

  useOnClickOutside(contentRef, onOutSideClick);

  const onClickPreview = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>): void => {
    if (!isOpen && !buttonsRef.current?.contains(event.target as Node)) {
      setIsOpen(true);
    }
  };

  return (
    <div
      style={wrapperStyle}
      className={cn(styles.wrapper, {
        [styles.wrapper_open]: isOpen,
      })}
      ref={contentRef}
    >
      <span className={styles.label}>{label}</span>
      <div className={styles.preview} role="button" tabIndex={0} onClick={onClickPreview} onKeyPress={onClickPreview}>
        <span className={styles['active-option']}>{activeOption && activeOption.label}</span>
        <div className={styles.icons} ref={buttonsRef}>
          {activeOption && withEmptyOption && (
            <button className={cn(styles.button, styles['button-remove'])} onClick={onClickOption(null)} type="button">
              <SvgIcon kind="cross" className={styles.icon} />
            </button>
          )}
          <button className={styles.button} onClick={onToggleList} type="button">
            <SvgIcon
              kind="chevronDown"
              className={cn(styles.icon, styles.arrow, {
                [styles.arrow_up]: isOpen,
              })}
            />
          </button>
        </div>
      </div>
      <SlideDownUp
        onAnimationOpenEnd={onAnimationOpenEnd}
        className={cn(styles['list-wrapper'], {
          [styles['list-wrapper_overflow']]: isOverflow,
        })}
        isOpen={isOpen}
      >
        <ul className={styles.list}>
          {withEmptyOption && (
            <SelectOption
              isOpen={isOpen}
              activeOption={null}
              option={{ label: emptyOptionLabel, value: null }}
              onChange={onClickOption(null)}
            />
          )}
          {options.map((option) => (
            <SelectOption
              key={option.value}
              option={option}
              activeOption={activeOption}
              isOpen={isOpen}
              onChange={onClickOption(option.value)}
            />
          ))}
        </ul>
      </SlideDownUp>
    </div>
  );
};

export { Select };
