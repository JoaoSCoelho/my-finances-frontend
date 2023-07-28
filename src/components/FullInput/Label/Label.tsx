interface ILabelProps extends PropsWithChildren, LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

import RequiredAsteriskTooltip from '@/components/RequiredAsteriskTooltip/RequiredAsteriskTooltip';
import { LabelHTMLAttributes, PropsWithChildren } from 'react';

import styles from './Label.module.css';

export default function Label({ className, children, required, ...props }: ILabelProps) {
  return (
    <label {...props} className={[styles.label, className].join(' ')}>
      {children}
      {required && <RequiredAsteriskTooltip />}
    </label>
  );
}
