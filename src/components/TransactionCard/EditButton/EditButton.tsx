import { SetState } from '@/types/SetState';
import { BiPencil } from 'react-icons/bi';

import styles from './EditButton.module.css';

interface IEditButtonProps {
  containerClassName?: string;
  setCanEdit: SetState<boolean>;
}

export default function EditButton({ containerClassName, setCanEdit }: IEditButtonProps) {
  return (
    <div className={[styles.container, containerClassName].join(' ')}>
      <button onClick={() => setCanEdit(true)} type="button">
        <BiPencil />
      </button>
    </div>
  );
}
