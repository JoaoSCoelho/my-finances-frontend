import Input from '@/components/Input';
import {
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';

import styles from './AuthForm.module.css';

export interface IAuthFormProps<FormData extends FieldValues> {
  form: UseFormReturn<FormData>;
  type: 'login' | 'register';
  onFormSubmit: SubmitHandler<FormData>;
  onFormSubmitError?: SubmitErrorHandler<FormData>;
}

export default function AuthForm<FormData extends FieldValues>({
  form: {
    handleSubmit,
    register,
    formState: { errors },
  },
  type,
  onFormSubmit: onSubmit,
  onFormSubmitError: onSubmitError,
}: IAuthFormProps<FormData>) {
  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit(
          onSubmit as SubmitHandler<FieldValues>,
          onSubmitError as SubmitErrorHandler<FieldValues>,
        )}
      >
        <div className={styles.inputsContainer}>
          {type === 'register' && (
            <Input
              {...register('username' as Path<FormData>, { required: true })}
              name="username"
              type="text"
              id="username-input"
              placeholder="Nome de usuário"
              errors={errors}
              className={styles.input}
            />
          )}
          <Input
            {...register('email' as Path<FormData>, { required: true })}
            name="email"
            type="email"
            id="email-input"
            placeholder="Email"
            errors={errors}
            className={styles.input}
          />
          <Input
            {...register('password' as Path<FormData>, { required: true })}
            name="password"
            type="password"
            id="password-input"
            placeholder="Senha"
            errors={errors}
            className={styles.input}
          />
        </div>
        <button className={styles.submitBtn} type="submit">
          <FaArrowRight />
        </button>
      </form>
    </>
  );
}
