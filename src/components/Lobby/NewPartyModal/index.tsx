import React from 'react';
import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '../../Common/Button';
import { ModalLayout } from '../../Common/ModalLayout';
import { Switcher } from '../../Common/Switcher';
import { Select } from '../../Common/Select';
import { ChessColor } from '../../Board/TemplateBoard/types';
import { useFetchDataApi } from '../../../hook/useFetchDataApi.hook';
import { useNotification } from '../../Common/Notification';
import { userStore } from '../../../mobx';
import { Party } from '../../../mobx/userStore';

import styles from './NewPartyModal.module.scss';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

interface FormFields {
  isAutoPromotion: boolean;
  isConfirmSteps: boolean;
  myColor: ChessColor;
}

interface ColorItem {
  label: string;
  value: ChessColor;
}

const COLOR_LIST: ColorItem[] = [
  { label: 'Белые', value: 'w' },
  { label: 'Черные', value: 'b' },
];

const NewPartyModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const { insertParty } = userStore;

  const { addNotification } = useNotification();
  const [isLoading, craeteRequest] = useFetchDataApi<any, Party>('/api/chess/', 'POST');

  const { register, handleSubmit, control } = useForm<FormFields>({
    defaultValues: {
      myColor: COLOR_LIST[0].value,
    },
  });

  const onSubmit = async (data: FormFields): Promise<void> => {
    const { error, response } = await craeteRequest({ colorCreater: data.myColor });

    if (error || !response) {
      addNotification({ title: 'Ошибка', description: error || 'Попробуйте еще раз' }, { appearance: 'error' });
      return;
    }

    insertParty(response);
    onClose();
  };

  return (
    <ModalLayout classNameInner={styles['modal-inner']} isVisible={isVisible} onClose={onClose}>
      <h3 className={styles.title}>Настройка игры</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Авто превращение</span>
          <Switcher className={styles.switcher} disabled {...register('isAutoPromotion')} />
        </div>
        <div className={cn(styles['switcher-line'], styles.field)}>
          <span className={styles['switcher-title']}>Подтверждать каждый ход</span>
          <Switcher className={styles.switcher} disabled {...register('isConfirmSteps')} />
        </div>
        <Button type="submit" text="Создать партию" disabled={isLoading} isLoading={isLoading} theme="primary" />
      </form>
    </ModalLayout>
  );
};

export { NewPartyModal };
