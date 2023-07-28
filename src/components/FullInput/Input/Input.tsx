import { forwardRef, InputHTMLAttributes, Ref, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import styles from './Input.module.css';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  haveEye?: boolean;
  eyeBtnClassName?: string;
}

const Input = forwardRef(
  (
    { haveEye, className, eyeBtnClassName, ...props }: IInputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [eyeOpen, setEyeOpen] = useState(false);

    return (
      <>
        <input
          {...props}
          type={haveEye ? (eyeOpen ? 'text' : props.type) : props.type}
          name={props.name}
          className={[styles.input, haveEye && styles.haveEye, className].join(' ')}
          ref={ref}
        />
        {haveEye && (
          <button
            className={`${styles.eyeBtn} ${eyeBtnClassName}`}
            type="button"
            onClick={() => setEyeOpen((curr) => !curr)}
          >
            {eyeOpen ? (
              <AiOutlineEyeInvisible color="var(--gray)" size={25} />
            ) : (
              <AiOutlineEye color="var(--gray)" size={25} />
            )}
          </button>
        )}
      </>
    );
  },
);

export default Input;
