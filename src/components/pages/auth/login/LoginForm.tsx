import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthForm from '../AuthForm';

export const emailSchema = yup
  .string()
  .required()
  .email('Deve ser um email válido')
  .max(128)
  .matches(/^[^@]+@[^@]+$/g)
  .matches(/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@/gi)
  .matches(
    /@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/gi,
  )
  .matches(
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/gi,
  );

export const passwordSchema = yup
  .string()
  .required()
  .min(6)
  .max(100)
  .matches(/[a-zÀ-ÿ]+/gi)
  .matches(/\d+/g);

const loginSchema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

type LoginForm = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });
  const { setError } = form;

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
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

  return (
    <>
      <AuthForm form={form} type="login" onFormSubmit={onSubmit} />
    </>
  );
}
