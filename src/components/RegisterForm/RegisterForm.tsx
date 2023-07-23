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
import { emailSchema, passwordSchema } from '../LoginForm/LoginForm';

const registerSchema = yup
  .object({
    username: yup
      .string()
      .required('Campo obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(30, 'Máximo de 30 caracteres')
      .matches(
        /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
        'Pode ter apenas caracteres alfanuméricos (alguns deles acentuados), espaços, underlines e alguns caracteres especiais',
      ),
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

type RegisterForm = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) });
  const { setError } = form;

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    setSubmitIsLoading(true);

    api
      .post('users', data)
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
        toast.error(error.error, defaultToastOptions);
        setSubmitIsLoading(false);
      });
  };

  return (
    <>
      <AuthForm
        submitIsLoading={submitIsLoading}
        form={form}
        type="register"
        onFormSubmit={onSubmit}
      />
    </>
  );
}
