import { RefObject } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import Slider from 'react-slick';

import styles from './ArrowButton.module.css';

interface IArrowButtonProps {
  isNext?: boolean;
  sliderRef: RefObject<Slider>;
}

export default function ArrowButton({ isNext, sliderRef }: IArrowButtonProps) {
  return (
    <button
      className={[styles.arrowButton, styles[isNext ? 'next' : 'prev']].join(' ')}
      onClick={() => sliderRef.current?.[isNext ? 'slickNext' : 'slickPrev']()}
    >
      {isNext ? (
        <MdNavigateNext className={styles.arrow} />
      ) : (
        <MdNavigateBefore className={styles.arrow} />
      )}
    </button>
  );
}
