'use client';

import RegisterForm from '@/components/pages/auth/register/RegisterForm';
import Link from 'next/link';

import layoutStyles from '../Layout.module.css';

export default function Register() {
  return (
    <>
      <h1 className={layoutStyles.title}>Registre-se</h1>

      <RegisterForm />

      <Link href="/auth/login" className={layoutStyles.loginLink}>
        Já tem conta?{' '}
        <span className={layoutStyles.loginLinkEmphasis}>Fazer login</span>
      </Link>
    </>
  );
}
