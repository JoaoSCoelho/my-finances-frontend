import { FiSave } from 'react-icons/fi';

import styles from './SaveButton.module.css';

interface ISaveButtonProps {
  containerClassName?: string;
}

export default function SaveButton({ containerClassName }: ISaveButtonProps) {
  return (
    <div className={[styles.container, containerClassName].join(' ')}>
      <button type="submit">
        <FiSave />
      </button>
    </div>
  );
}
