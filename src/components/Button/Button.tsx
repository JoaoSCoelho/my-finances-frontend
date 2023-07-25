import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  symbol?: ReactNode;
  wrapperClassName?: string;
}

export default function Button({
  wrapperClassName,
  className,
  symbol,
  children,
  ...props
}: IButtonProps) {
  return (
    <div className={[styles.buttonWrapper, wrapperClassName].join(' ')}>
      <button type="button" {...props} className={`${styles.button} ${className}`}>
        {symbol}
        {children}
      </button>
    </div>
  );
}
