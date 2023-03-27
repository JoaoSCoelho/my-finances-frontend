import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.css';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  symbol?: ReactNode;
  wrapperClassName?: string;
}

export default function Button(props: IButtonProps) {
  return (
    <div className={`${styles.buttonWrapper} ${props.wrapperClassName}`}>
      <button {...props} className={`${styles.button} ${props.className}`}>
        {props.symbol}
        {props.children}
      </button>
    </div>
  );
}
