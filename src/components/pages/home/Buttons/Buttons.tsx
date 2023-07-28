import BigSquareLink from '@/components/BigSquareLink/BigSquareLink';
import { FaInfo, FaPiggyBank } from 'react-icons/fa';

import styles from './Buttons.module.css';

export default function Buttons() {
  return (
    <div className={styles.container}>
      <BigSquareLink style="white" value="Tutorial" href="/tutorial" icon={<FaInfo />} />
      <BigSquareLink
        style="green"
        value="Começar"
        href="/auth/register"
        icon={<FaPiggyBank />}
      />
    </div>
  );
}
