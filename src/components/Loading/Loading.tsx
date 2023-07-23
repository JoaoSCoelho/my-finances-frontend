// eslint-disable-next-line import/named
import { IconBaseProps } from 'react-icons';
import { AiOutlineLoading } from 'react-icons/ai';

import styles from './Loading.module.css';

export default function Loading({ className, ...props }: IconBaseProps) {
  return (
    <AiOutlineLoading className={[styles.loading, className].join(' ')} {...props} />
  );
}
