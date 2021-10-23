import React from 'react';
import { useForm } from 'react-hook-form';

import { useFetchDataApi } from '../../../hook/useFetchDataApi.hook';
import { Button } from '../../Common/Button';
import { Input } from '../../Common/Input';
import { useNotification } from '../../Common/Notification';
import { FormLayout } from '../FormLayout';

import styles from './LoginForm.module.scss';

interface IFormFields {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { addNotification } = useNotification();
  const [, signInRequst] = useFetchDataApi<IFormFields>('/auth/sign-in/', 'POST');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFields>();

  const onSubmit = async (data: IFormFields): Promise<void> => {
    const { error, response } = await signInRequst(data);

    if (error || !response) {
      addNotification({ title: 'Ошибка', description: 'Попробуйте еще раз' }, { appearance: 'error' });
      return;
    }

    addNotification({ title: 'Успех', description: 'Вы успешно авторизировались' }, { appearance: 'success' });
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Войдите в свою учетную запись</h1>
        <Input
          className={styles.input}
          label="Email"
          placeholder="email@mail.ru"
          errorText={errors.email?.message}
          {...register('email', {
            required: 'Введите email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Некорректный email',
            },
          })}
        />
        <Input
          className={styles.input}
          type="password"
          label="Пароль"
          errorText={errors.password?.message}
          {...register('password', {
            required: 'Введите пароль',
            minLength: {
              value: 8,
              message: 'Слишком маленький',
            },
            maxLength: {
              value: 200,
              message: 'Слишком большой',
            },
          })}
        />
        <Button className={styles.button} type="submit" text="Войти" theme="primary" />
      </form>
    </FormLayout>
  );
};

export { LoginForm };
