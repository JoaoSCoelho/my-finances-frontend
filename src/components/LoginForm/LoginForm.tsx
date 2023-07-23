'use client';

import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import AuthForm from '../AuthForm/AuthForm';

export const emailSchema = yup
  .string()
  .required('Campo obrigatório')
  .email('Email inválido')
  .max(128, 'Máximo de 128 caracteres')
  .matches(/^[^@]+@[^@]+$/g, 'Deve possuir apenas um arroba "@"')
  .matches(
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@/gi,
    'Antes do "@" apenas letras, números e alguns caracteres especiais',
  )
  .matches(
    /@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/gi,
    'Depois do "@" apenas caracteres alfanuméricos, hífens e um ponto "." separador do TLD',
  )
  .matches(
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/gi,
    'Estrutura incorreta',
  );

export const passwordSchema = yup
  .string()
  .required('Campo obrigatório')
  .min(6, 'Mínimo de 6 caracteres')
  .max(100, 'Máximo de 100 caracteres')
  .matches(/[a-zÀ-ÿ]+/gi, 'Deve ter pelo menos uma letra')
  .matches(/\d+/g, 'Deve ter pelo menos um número');

const loginSchema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

type LoginForm = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });
  const { setError } = form;

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setSubmitIsLoading(true);

    api
      .post('login', data)
      .then(({ data: resData }) => {
        auth.signin(resData.accessToken, resData.refreshToken, resData.user);
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
        setSubmitIsLoading(false);
      });
  };

  return (
    <>
      <AuthForm
        submitIsLoading={submitIsLoading}
        form={form}
        type="login"
        onFormSubmit={onSubmit}
      />
    </>
  );
}
