'use client';

import { AuthContext } from '@/contexts/auth';
import { useContext } from 'react';

export default function DashBoard() {
  const auth = useContext(AuthContext);

  return (
    <>
      <main></main>
    </>
  );
}
