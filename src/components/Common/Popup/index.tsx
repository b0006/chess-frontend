import React from 'react';
import cn from 'classnames';

import { ModalLayout } from '../ModalLayout';
import { Button } from '../Button';
import { SvgIcon, ICON_LIST } from '../SvgIcon';

import { TAppearance } from './types';
import './styles.scss';

const ICON_KIND_DATA: Record<TAppearance, keyof typeof ICON_LIST> = {
  success: 'checked',
  error: 'cross',
  info: 'info',
  warning: 'warning',
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
            <SvgIcon kind={ICON_KIND_DATA[appearance]} className="popup__icon" />
          </div>
        </div>
        {title && <h4 className="popup__title">{title}</h4>}
        {description && <div className="popup__description">{description}</div>}
      </div>
      {hasButtons && (
        <div className="popup__buttons">
          {confirm && <Button className="popup__button" text={confirm.label} onClick={onConfirm} theme="primary" />}
          {cancel && <Button className="popup__button" text={cancel.label} onClick={onCancel} theme="secondary" />}
        </div>
      )}
    </ModalLayout>
  );
};

export { Popup };
