import React, { useRef, useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './SlideDownUp.module.scss';

export interface Props {
  isOpen: boolean;
  className?: string;
  onAnimationOpenEnd?: () => void;
  onAnimationCloseEnd?: () => void;
}

const SlideDownUp: React.FC<Props> = ({ isOpen, className, onAnimationOpenEnd, onAnimationCloseEnd, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [heightContent, setHeightContent] = useState(0);

  const [initOpenState, setInitOpenState] = useState(isOpen);

  useEffect(() => {
    if (!isOpen && initOpenState) {
      setInitOpenState(false);
    }
  }, [isOpen, initOpenState]);

  const contentChildren = contentRef.current && contentRef.current.children;
  const contentComputedStyle = contentRef.current && getComputedStyle(contentRef.current);

  useEffect(() => {
    const onSetHeightContent = (): void => {
      if (isOpen) {
        const childEl = contentRef.current?.children[0];
        setHeightContent(childEl?.clientHeight || 0);
      }
    };

    onSetHeightContent();

    window.addEventListener('resize', onSetHeightContent);
    window.addEventListener('load', onSetHeightContent);

    return () => {
      window.removeEventListener('resize', onSetHeightContent);
      window.removeEventListener('load', onSetHeightContent);
    };
  }, [
    isOpen,
    contentChildren,
    // force update
    contentComputedStyle,
  ]);

  const onTransitionEnd = (): void => {
    if (isOpen && typeof onAnimationOpenEnd === 'function') {
      onAnimationOpenEnd();
    }
    if (!isOpen && typeof onAnimationCloseEnd === 'function') {
      onAnimationCloseEnd();
    }
  };

  return (
    <div
      onTransitionEnd={onTransitionEnd}
      className={cn(styles['slide-down-up'], className, {
        [styles['slide-down-up_opened']]: isOpen,
        [styles['slide-down-up_open-once']]: initOpenState,
      })}
      style={{ height: initOpenState || isOpen ? `${heightContent}px` : '0px' }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export { SlideDownUp };
