import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';

import { ClientOnlyPortal } from './ClientOnlyPortal';
import './styles.scss';

export interface IProps {
  isVisible: boolean;
  onClose: () => void;
  portalTargetSelector?: string;
  overlayClickClose?: boolean;
  showCloseButton?: boolean;
  classNameOverlay?: string;
  classNameInner?: string;
  classNameContent?: string;
}

const ModalLayout: React.FC<IProps> = ({
  portalTargetSelector,
  overlayClickClose,
  children,
  onClose,
  isVisible,
  showCloseButton = true,
  classNameOverlay,
  classNameContent,
  classNameInner,
}) => {
  const [needClose, setNeedClose] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);

  const [innerIsVisible, setInnerIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setInnerIsVisible(true);
    }

    if (innerIsVisible && !isVisible) {
      setNeedClose(true);
    }
  }, [innerIsVisible, isVisible]);

  if (!innerIsVisible) {
    return null;
  }

  const onNeedClose = (): void => {
    setNeedClose(true);
  };

  const onCloseEnd = (): void => {
    if (needClose) {
      onClose();
      setNeedClose(false);
      setInnerIsVisible(false);
    }
  };

  const onOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>
  ): void => {
    const innerEl = innerRef.current;

    if (innerEl && event.target instanceof Element && innerEl.contains(event.target)) {
      return;
    }

    if (overlayClickClose) {
      onNeedClose();
    }
  };

  return (
    <ClientOnlyPortal selector={portalTargetSelector}>
      <div
        className={cn('modal-layout-overlay', classNameOverlay, {
          'modal-layout-overlay--hide': needClose,
        })}
        tabIndex={0}
        role="button"
        onClick={onOverlayClick}
        onKeyPress={onOverlayClick}
        onAnimationEnd={onCloseEnd}
      >
        <div
          ref={innerRef}
          className={cn('modal-layout__inner', classNameInner, {
            'modal-layout__inner--hide': needClose,
          })}
        >
          <div className={cn('modal-layout__content', classNameContent)}>
            {showCloseButton && (
              <button className="modal-layout__button-close" type="button" onClick={onNeedClose}>
                X
              </button>
            )}
            {children}
          </div>
        </div>
      </div>
    </ClientOnlyPortal>
  );
};

export default ModalLayout;
