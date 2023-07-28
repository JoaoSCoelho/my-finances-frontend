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
import { registerSchema } from '../../AuthForm/yup';

type RegisterForm = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) });

  // ---------- functions ----------

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
    setIsSubmitting(true);

    api
      .post('users', data)
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
          `Ocorreu um erro ao criar sua conta: ${
            error.response?.data?.error || 'Erro inesperado!'
          }`,
          defaultToastOptions,
        );
        setIsSubmitting(false);
      });
  };

  // ---------- return ----------

  return (
    <>
      <AuthForm
        isSubmitting={isSubmitting}
        form={form}
        type="register"
        onFormSubmit={onSubmit}
      />
    </>
  );
}
