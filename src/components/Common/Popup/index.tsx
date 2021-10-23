import React from 'react';
import cn from 'classnames';

import { ModalLayout } from '../ModalLayout';
import { SvgIcon, ICON_LIST } from '../SvgIcon';
import { Button } from '../Button';

import { Appearance } from './types';
import styles from './Popup.module.scss';

const ICON_KIND_DATA: Record<Appearance, keyof typeof ICON_LIST> = {
  success: 'checked',
  error: 'cross',
  info: 'info',
  warning: 'warning',
};

export interface Handler {
  label: string;
  handler: () => void;
}

export interface Props {
  isVisible: boolean;
  confirm?: Handler;
  cancel?: Handler;
  appearance?: Appearance;
  onClose: () => void;
  overlayClickClose?: boolean;
  showCloseButton?: boolean;
  title?: string;
  description?: string;
}

const Popup: React.FC<Props> = ({
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
      classNameInner={styles['modal-inner']}
    >
      <div className={styles.content}>
        <div className={styles['icon-wrapper']}>
          <div className={cn(styles['icon-inner'], styles[`icon-inner_${appearance}`])}>
            <SvgIcon kind={ICON_KIND_DATA[appearance]} className={styles.icon} />
          </div>
        </div>
        {title && <h4 className={styles.title}>{title}</h4>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {hasButtons && (
        <div className={styles.buttons}>
          {confirm && <Button className={styles.button} text={confirm.label} onClick={onConfirm} theme="primary" />}
          {cancel && <Button className={styles.button} text={cancel.label} onClick={onCancel} theme="secondary" />}
        </div>
      )}
    </ModalLayout>
  );
};

export { Popup };
