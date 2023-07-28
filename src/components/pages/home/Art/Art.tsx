import Image from 'next/image';

import landingImage from '../../../../assets/landing-image.svg';
import styles from './Art.module.css';

interface IArtProps {
  containerClassName?: string;
}

export default function Art(props: IArtProps) {
  return (
    <div className={[styles.container, props.containerClassName].join(' ')}>
      <div className={styles.art}>
        <Image
          height={480}
          src={landingImage}
          alt="Um homem apoiado num cartão de crédito grande, rodeado de moedas. Ilustração feita por Storyset"
        />
      </div>
      <a
        className={styles.artAttribution}
        target="_blank"
        href="https://storyset.com/business"
      >
        Business illustrations by Storyset
      </a>
    </div>
  );
}
