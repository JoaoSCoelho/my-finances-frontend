import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import AuthForm from './AuthForm';

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<IRegisterForm>();
  const { setError } = form;

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
        toast.error(error.error, defaultToastOptions);
      });
  };
  const onSubmitError: SubmitErrorHandler<IRegisterForm> = () =>
    toast.warn('Você deve preencher todos os campos!', defaultToastOptions);

  return (
    <>
      <ToastContainer />
      <AuthForm
        form={form}
        type="register"
        onFormSubmit={onSubmit}
        onFormSubmitError={onSubmitError}
      />
    </>
  );
}
