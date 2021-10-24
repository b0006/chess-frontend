import React from 'react';
import cn from 'classnames';
import { useForm } from 'react-hook-form';

import { Button } from '../../Common/Button';
import { ModalLayout } from '../../Common/ModalLayout';
import { Switcher } from '../../Common/Switcher';

import styles from './GameSettingsModal.module.scss';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

interface FormFields {
  isAutoPromotion: boolean;
  isColoredMoves: boolean;
  isConfirmSteps: boolean;
  isAudioOn: boolean;
}

const GameSettingsModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit = async (data: FormFields): Promise<void> => {
    window.console.log(data);
  };

  return (
    <ModalLayout classNameInner={styles['modal-inner']} isVisible={isVisible} onClose={onClose} overlayClickClose>
      <h3 className={styles.title}>Настройка игры</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Авто превращение</span>
          <Switcher className={styles.switcher} {...register('isAutoPromotion')} />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Подсвечивать возможные ходы</span>
          <Switcher className={styles.switcher} defaultChecked {...register('isColoredMoves')} />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Подтверждать каждый ход</span>
          <Switcher className={styles.switcher} {...register('isConfirmSteps')} />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Включить звуки</span>
          <Switcher className={styles.switcher} {...register('isConfirmSteps')} />
        </div>
        <Button type="submit" text="Начать игру" theme="primary" />
      </form>
    </ModalLayout>
  );
};

export { GameSettingsModal };
