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
  onFormSubmitError: SubmitErrorHandler<FormData>;
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
            <div className={styles.inputWrapper}>
              <input
                {...register('username' as Path<FormData>, { required: true })}
                className={`${styles.input} ${errors.username && styles.error}`}
                type="text"
                name="username"
                id="username-input"
                placeholder="Nome de usuário"
              />
              {errors.username && (
                <span className={styles.inputError}>
                  {errors.username.message as string}
                </span>
              )}
            </div>
          )}
          <div className={styles.inputWrapper}>
            <input
              {...register('email' as Path<FormData>, { required: true })}
              className={`${styles.input} ${errors.email && styles.error}`}
              type="email"
              name="email"
              id="email-input"
              placeholder="Email"
            />
            {errors.email && (
              <span className={styles.inputError}>
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              {...register('password' as Path<FormData>, { required: true })}
              className={`${styles.input} ${errors.password && styles.error}`}
              type="password"
              name="password"
              id="password-input"
              placeholder="Senha"
            />
            {errors.password && (
              <span className={styles.inputError}>
                {errors.password.message as string}
              </span>
            )}
          </div>
        </div>
        <button className={styles.submitBtn} type="submit">
          <FaArrowRight />
        </button>
      </form>
    </>
  );
}
