import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import AuthForm from './AuthForm';

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<ILoginForm>();
  const { setError } = form;

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    if (data.email.length > 128)
      return setError('email', {
        message: 'O email deve ser menor ou igual 128 caracteres!',
      });

    if (data.password.length < 6 || data.password.length > 100)
      return setError('password', {
        message: 'A senha deve ter entre 6 e 100 caracteres!',
      });

    api
      .post('login', data)
      .then(({ data: resData }) => {
        auth.signin(resData.token, resData.user);
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
        if (error.name === 'Invalid credentials')
          return toast.error('Email ou senha inválidos', defaultToastOptions);
        toast.error(error.error, defaultToastOptions);
      });
  };
  const onSubmitError: SubmitErrorHandler<ILoginForm> = () =>
    toast.warn('Você deve preencher todos os campos!', defaultToastOptions);

  return (
    <>
      <ToastContainer />
      <AuthForm
        form={form}
        type="login"
        onFormSubmit={onSubmit}
        onFormSubmitError={onSubmitError}
      />
    </>
  );
}
