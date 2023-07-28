'use client';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import Loading from '../Loading/Loading';
import styles from './BigSquareLink.module.css';

interface IBigSquareLinkProps {
  icon: ReactNode;
  value: string;
  href: string;
  style: 'white' | 'green';
}

export default function BigSquareLink(props: IBigSquareLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link
      className={[styles.link, styles[props.style]].join(' ')}
      href={props.href}
      onClick={() => setIsLoading(true)}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {props.icon}
          <span className={styles.value}>{props.value}</span>
        </>
      )}
    </Link>
  );
}
