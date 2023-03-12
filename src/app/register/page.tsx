'use client';

import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';

import styles from './Register.module.css';
interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export default function Register() {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    if (data.username.length < 3 || data.username.length > 30)
      return setError('username', {
        message: 'O nome de usuário deve ter entre 3 e 30 caracteres!',
      });

    if (data.email.length > 128)
      return setError('email', {
        message: 'O email deve ser menor ou igual 128 caracteres!',
      });

    if (data.password.length < 6 || data.password.length > 100)
      return setError('password', {
        message: 'A senha deve ter entre 6 e 100 caracteres!',
      });

    api
      .post('users', data)
      .then(({ data: resData }) => {
        auth.setToken(resData.token);
        auth.setUser(resData.createdUser);
        router.push('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        const error = err.response?.data;
        if (!error) return toast.error('Erro inesperado!');

        if (error.reason === 'invalid characters')
          setError(error.paramName, { message: 'Caracteres inválidos' });
        if (error.reason === 'incorrect structure')
          setError(error.paramName, { message: 'Estrutura incorreta' });
        toast.error(error.error, defaultToastOptions);
      });
  };
  const onSubmitError = () =>
    toast.warn('Você deve preencher todos os campos!', defaultToastOptions);

  return (
    <>
      <ToastContainer />
      <main className={styles.main}>
        <div className={styles.formSide}>
          <h1 className={styles.title}>Registre-se</h1>

          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit, onSubmitError)}
          >
            <div className={styles.inputsContainer}>
              <div className={styles.inputWrapper}>
                <input
                  {...register('username', { required: true })}
                  className={`${styles.input} ${
                    errors.username && styles.error
                  }`}
                  type="text"
                  name="username"
                  id="username-input"
                  placeholder="Nome de usuário"
                />
                {errors.username && (
                  <span className={styles.inputError}>
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  {...register('email', { required: true })}
                  className={`${styles.input} ${errors.email && styles.error}`}
                  type="email"
                  name="email"
                  id="email-input"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className={styles.inputError}>
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className={styles.inputWrapper}>
                <input
                  {...register('password', { required: true })}
                  className={`${styles.input} ${
                    errors.password && styles.error
                  }`}
                  type="password"
                  name="password"
                  id="password-input"
                  placeholder="Senha"
                />
                {errors.password && (
                  <span className={styles.inputError}>
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <button className={styles.submitBtn} type="submit">
              <FaArrowRight />
            </button>
          </form>
        </div>

        <div className={styles.imageSide}>
          <img className={styles.image} src="/coins.jpg" alt="Coins" />
        </div>
      </main>
    </>
  );
}
