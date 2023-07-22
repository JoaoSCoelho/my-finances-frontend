'use client';

import LoginForm from '@/components/LoginForm/LoginForm';
import Link from 'next/link';

import layoutStyles from '../Layout.module.css';

export default function Login() {
  return (
    <>
      <h1 className={layoutStyles.title}>Entrar</h1>

      <LoginForm />

      <Link href="/auth/register" className={layoutStyles.registerLink}>
        Ainda não tem conta?{' '}
        <span className={layoutStyles.registerLinkEmphasis}>Criar conta</span>
      </Link>
    </>
  );
}
