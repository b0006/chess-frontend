import React from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '../../Common/Button';
import { ModalLayout } from '../../Common/ModalLayout';
import { Switcher } from '../../Common/Switcher';
import { Select } from '../../Common/Select';

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
  difficult: number;
}

const AI_DIFFICULT = [
  { label: '800 (легко)', value: 800 },
  { label: '1000', value: 1000 },
  { label: '1200', value: 1200 },
  { label: '1400', value: 1400 },
  { label: '1600', value: 1600 },
  { label: '1800', value: 1800 },
  { label: '2000', value: 2000 },
  { label: '2200 (сложно)', value: 2200 },
];

const GameSettingsModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { register, handleSubmit, control } = useForm<FormFields>();

  const onSubmit = async (data: FormFields): Promise<void> => {
    window.console.log(data);
  };

  return (
    <ModalLayout classNameInner={styles['modal-inner']} isVisible={isVisible} onClose={onClose}>
      <h3 className={styles.title}>Настройка игры</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Controller
            control={control}
            name="difficult"
            // rules={{ required: true }}
            render={({
              field: { onChange, value },
              // fieldState: { invalid, isTouched, isDirty, error },
            }) => <Select label="Сложность" options={AI_DIFFICULT} onChange={onChange} value={value} />}
          />
        </div>
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
