import { Popup } from 'reactjs-popup';

import styles from './RequiredAsteriskTooltip.module.css';
import './RequiredAsteriskTooltip.css';

export default function RequiredAsteriskTooltip() {
  return (
    <Popup
      repositionOnResize
      className="required-tooltip"
      trigger={<span className={styles.required}>*</span>}
      on="hover"
      mouseEnterDelay={50}
      position="top center"
      arrow
    >
      <span className={`${styles.requiredText} required-text`}>
        Esse campo precisa ser preenchido
      </span>
    </Popup>
  );
}
