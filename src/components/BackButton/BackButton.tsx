import { useRouter } from 'next/navigation';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

import styles from './BackButton.module.css';

interface IBackButtonProps {
  className?: string;
}

export default function BackButton(props: IBackButtonProps) {
  const router = useRouter();

  return (
    <button
      className={[styles.backButton, props.className].join(' ')}
      type="button"
      onClick={() => {
        router.back();
      }}
    >
      <HiOutlineArrowNarrowLeft />
    </button>
  );
}
