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

import AuthForm from '../../AuthForm/AuthForm';
import { loginSchema } from '../../AuthForm/yup';

type LoginForm = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const [submitIsLoading, setSubmitIsLoading] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  // ---------- functions ----------

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    setSubmitIsLoading(true);

    api
      .post('login', data)
      .then((response) => {
        auth.signin(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.user,
        );
        router.push('/dashboard');
      })
      .catch((error) => {
        toast.error(
          `Ocorreu um erro ao fazer login: ${
            error.response?.data?.error || 'Erro inesperado!'
          }`,
          defaultToastOptions,
        );
        setSubmitIsLoading(false);
      });
  };

  // ---------- return ----------

  return (
    <>
      <AuthForm
        isSubmitting={submitIsLoading}
        form={form}
        type="login"
        onFormSubmit={onSubmit}
      />
    </>
  );
}
