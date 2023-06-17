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
import { emailSchema, passwordSchema } from '../login/LoginForm';

const registerSchema = yup
  .object({
    username: yup
      .string()
      .required()
      .min(3)
      .max(30)
      .matches(
        /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
      ),
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

type RegisterForm = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const form = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) });
  const { setError } = form;

  const onSubmit: SubmitHandler<RegisterForm> = (data) => {
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

  return (
    <>
      <AuthForm form={form} type="register" onFormSubmit={onSubmit} />
    </>
  );
}
