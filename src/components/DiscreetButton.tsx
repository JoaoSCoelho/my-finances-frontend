import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './DiscreetButton.module.css';

interface IDiscreetButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  symbol?: ReactNode;
  wrapperClassName?: string;
}

export default function DiscreetButton(props: IDiscreetButtonProps) {
  return (
    <div className={`${styles.buttonWrapper} ${props.wrapperClassName}`}>
      <button {...props} className={`${styles.button} ${props.className}`}>
        {props.symbol}
        {props.children}
      </button>
    </div>
  );
}
