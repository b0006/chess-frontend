import React from 'react';
import cn from 'classnames';

import ModalLayout from '../ModalLayout';

import { TAppearance } from './types';
import './styles.scss';

const ICON_KIND_DATA: Record<TAppearance, string> = {
  success: 'checked',
  error: 'cross',
  info: 'info',
  warning: 'exclamationTriangle',
};

export interface IHandler {
  label: string;
  handler: () => void;
}

export interface IProps {
  isVisible: boolean;
  confirm?: IHandler;
  cancel?: IHandler;
  appearance?: TAppearance;
  onClose: () => void;
  overlayClickClose?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
}

const Popup: React.FC<IProps> = ({
  isVisible,
  showCloseButton,
  appearance = 'info',
  cancel,
  confirm,
  onClose,
  overlayClickClose,
  title,
  description,
}) => {
  const hasButtons = cancel || confirm;

  const onConfirm = (): void => {
    if (confirm?.handler) {
      confirm.handler();
      onClose();
    }
  };

  const onCancel = (): void => {
    if (cancel?.handler) {
      cancel.handler();
      onClose();
    }
  };

  return (
    <ModalLayout
      showCloseButton={showCloseButton}
      isVisible={isVisible}
      overlayClickClose={overlayClickClose}
      onClose={onClose}
      classNameInner="popup__modal-inner"
    >
      <div className="popup__content">
        <div className="popup__icon-wrapper">
          <div className={cn('popup__icon-inner', `popup__icon-inner--${appearance}`)}>
            {ICON_KIND_DATA[appearance]}
          </div>
        </div>
        {title && <h4 className="popup__title">{title}</h4>}
        {description && <div className="popup__description">{description}</div>}
      </div>
      {hasButtons && (
        <div className="popup__buttons">
          {confirm && (
            <button className="popup__button" onClick={onConfirm}>
              {confirm.label}
            </button>
          )}
          {cancel && (
            <button className="popup__button" onClick={onCancel}>
              {cancel.label}
            </button>
          )}
        </div>
      )}
    </ModalLayout>
  );
};

export { Popup };
