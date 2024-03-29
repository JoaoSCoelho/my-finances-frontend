import { UseStateReturn } from '@/types/UseStateReturn';
import { AiFillPlusCircle } from 'react-icons/ai';

import styles from './NewAccountCard.module.css';

interface INewAccountCardProps {
  newAccountModalIsOpenState: UseStateReturn<boolean>;
}

export default function NewAccountCard({
  newAccountModalIsOpenState: [, setNewAccountModalIsOpen],
}: INewAccountCardProps) {
  return (
    <button
      onClick={() => setNewAccountModalIsOpen(true)}
      type="button"
      className={styles.newAccountCard}
    >
      <span className={styles.newAccountText}>Criar nova</span>
      <AiFillPlusCircle className={styles.newAccountSymbol} />
    </button>
  );
}
