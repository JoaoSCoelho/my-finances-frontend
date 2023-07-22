import { forwardRef, InputHTMLAttributes, ReactNode, Ref, useState } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import RequiredAsteriskTooltip from '../RequiredAsteriskTooltip/RequiredAsteriskTooltip';
import styles from './Input.module.css';

interface IInputProps<FormData extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors<FormData>;
  name: string;
  wrapperClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  eyeBtnClassName?: string;
  label?: boolean;
  labelValue?: ReactNode;
  inputEl?: (
    props: Omit<IInputProps<FormData>, 'inputEl' | 'containerClassName' | 'haveEye'> & {
      ref: Ref<HTMLElement>;
    },
  ) => ReactNode;
  haveEye?: boolean;
}

const Input = forwardRef(
  <FormData extends FieldValues>(
    { inputEl, containerClassName, haveEye, ...props }: IInputProps<FormData>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const inputClassName = `${styles.input} ${props.errors[props.name] && styles.error} ${
      props.className
    }`;

    const [eyeOpen, setEyeOpen] = useState<boolean>(false);

    return (
      <div className={`${styles.inputWrapper} ${props.wrapperClassName}`}>
        {props.label && (
          <label className={`${styles.label} ${props.labelClassName}`} htmlFor={props.id}>
            {props.labelValue}
            {props.required && <RequiredAsteriskTooltip />}
          </label>
        )}
        <div
          className={`
              ${styles.inputContainer}
              ${haveEye && styles.haveEye}
              ${containerClassName}
            `}
        >
          {inputEl ? (
            inputEl({
              ...props,
              className: inputClassName,
              ref,
            })
          ) : (
            <>
              <input
                {...props}
                type={haveEye ? (eyeOpen ? 'text' : props.type) : props.type}
                name={props.name}
                className={inputClassName}
                ref={ref}
              />
              {haveEye && (
                <button
                  className={`${styles.eyeBtn} ${props.eyeBtnClassName}`}
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
          )}
        </div>
        {props.errors[props.name] && (
          <span className={`${styles.inputError} ${props.errorClassName}`}>
            {props.errors[props.name]?.message as string}
          </span>
        )}
      </div>
    );
  },
);

export default Input;
