import React from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Button } from '../../Common/Button';
import { ModalLayout } from '../../Common/ModalLayout';
import { Switcher } from '../../Common/Switcher';
import { Select } from '../../Common/Select';
import { ChessColor } from '../../Board/TemplateBoard/types';
import { gameStore } from '../../../mobx';

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
  myColor: ChessColor;
}

interface DificultItem {
  label: string;
  value: number;
}

interface ColorItem {
  label: string;
  value: ChessColor;
}

const AI_DIFFICULT: DificultItem[] = [
  { label: '800 (легко)', value: 1 },
  { label: '1000', value: 3 },
  { label: '1200', value: 5 },
  { label: '1400', value: 7 },
  { label: '1600', value: 9 },
  { label: '1800', value: 11 },
  { label: '2000', value: 13 },
  { label: '2200 (сложно)', value: 15 },
];

const COLOR_LIST: ColorItem[] = [
  { label: 'Белые', value: 'w' },
  { label: 'Черные', value: 'b' },
];

const GameSettingsModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { setGameData } = gameStore;
  const history = useHistory();

  const { register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      difficult: AI_DIFFICULT[0].value,
      myColor: COLOR_LIST[0].value,
      isColoredMoves: true,
    },
  });

  const onSubmit = (data: FormFields): void => {
    setGameData({
      ...data,
      isPlaying: true,
      isVersusAi: true,
    });

    history.push('/offline-game');
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
        <div className={styles.field}>
          <Controller
            control={control}
            name="myColor"
            // rules={{ required: true }}
            render={({
              field: { onChange, value },
              // fieldState: { invalid, isTouched, isDirty, error },
            }) => <Select label="Моя сторона" options={COLOR_LIST} onChange={onChange} value={value} />}
          />
        </div>
        {/* <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Авто превращение</span>
          <Switcher className={styles.switcher} {...register('isAutoPromotion')} />
        </div> */}
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Подсвечивать возможные ходы</span>
          <Switcher className={styles.switcher} {...register('isColoredMoves')} />
        </div>
        {/* <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Подтверждать каждый ход</span>
          <Switcher className={styles.switcher} {...register('isConfirmSteps')} />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Включить звуки</span>
          <Switcher className={styles.switcher} {...register('isConfirmSteps')} />
        </div> */}
        <Button type="submit" text="Начать игру" theme="primary" />
      </form>
    </ModalLayout>
  );
};

export { GameSettingsModal };
