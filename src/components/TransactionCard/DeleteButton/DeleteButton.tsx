import { FiTrash2 } from 'react-icons/fi';

import styles from './DeleteButton.module.css';

interface IDeleteButtonProps {
  onClick: () => any;
  containerClassName?: string;
}

export default function DeleteButton({
  onClick,
  containerClassName,
}: IDeleteButtonProps) {
  return (
    <div className={[styles.container, containerClassName].join(' ')}>
      <button onClick={onClick} type="button">
        <FiTrash2 />
      </button>
    </div>
  );
}
