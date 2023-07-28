import { HTMLAttributes, PropsWithChildren } from 'react';

import styles from './ErrorText.module.css';

interface IErrorTextProps extends PropsWithChildren, HTMLAttributes<HTMLSpanElement> {}

export default function ErrorText({ children, className, ...props }: IErrorTextProps) {
  return (
    <span {...props} className={[styles.errorText, className].join(' ')}>
      {children}
    </span>
  );
}
