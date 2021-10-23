import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useFetchDataApi } from '../../../hook/useFetchDataApi.hook';
import { userStore } from '../../../mobx';
import { ProfileData } from '../../../mobx/userStore';
import { Button } from '../../Common/Button';
import { Input } from '../../Common/Input';
import { useNotification } from '../../Common/Notification';
import { FormLayout } from '../FormLayout';

import styles from './SignUpForm.module.scss';

interface IFormFields {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const history = useHistory();
  const { setProfileData } = userStore;

  const { addNotification } = useNotification();
  const [isLoading, signUpRequst] = useFetchDataApi<IFormFields, ProfileData>('/auth/sign-up/', 'POST');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormFields>();

  const password = useRef('');
  password.current = watch('password', '');

  const onSubmit = async (data: IFormFields): Promise<void> => {
    const { error, response } = await signUpRequst(data);

    if (error || !response) {
      addNotification({ title: 'Ошибка', description: error || 'Попробуйте еще раз' }, { appearance: 'error' });
      return;
    }

    setProfileData(response);
    history.push('/');
  };

  return (
    <FormLayout isLoading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Зарегистрируйтесь для своей учетной записи</h1>
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
          label="Логин"
          placeholder="login"
          errorText={errors.username?.message}
          {...register('username', {
            required: 'Введите логин',
            minLength: {
              value: 3,
              message: 'Слишком маленький',
            },
            maxLength: {
              value: 48,
              message: 'Слишком большой',
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
        <Input
          className={styles.input}
          type="password"
          label="Подтверждение пароля"
          errorText={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Подтвердите пароль',
            validate: (value) => value === password.current || 'Пароли не совпадают',
          })}
        />
        <Button className={styles.button} type="submit" text="Продолжить" theme="primary" />
      </form>
    </FormLayout>
  );
};

export { SignUpForm };
