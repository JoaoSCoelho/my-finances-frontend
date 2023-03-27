import { forwardRef, InputHTMLAttributes, ReactNode, Ref } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

import styles from './Input.module.css';
import RequiredAsteriskTooltip from './RequiredAsteriskTooltip';

interface IInputProps<FormData extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  errors: FieldErrors<FormData>;
  name: string;
  wrapperClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  label?: boolean;
  labelValue?: ReactNode;
  inputEl?: (
    props: Omit<IInputProps<FormData>, 'inputEl'> & { ref: Ref<HTMLElement> },
  ) => ReactNode;
}

const Input = forwardRef(
  <FormData extends FieldValues>(
    { inputEl, ...props }: IInputProps<FormData>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const inputClassName = `${styles.input} ${
      props.errors[props.name] && styles.error
    } ${props.className}`;

    return (
      <div className={`${styles.inputWrapper} ${props.wrapperClassName}`}>
        {props.label && (
          <label
            className={`${styles.label} ${props.labelClassName}`}
            htmlFor={props.id}
          >
            {props.labelValue}
            {props.required && <RequiredAsteriskTooltip />}
          </label>
        )}
        {inputEl ? (
          inputEl({
            ...props,
            className: inputClassName,
            ref,
          })
        ) : (
          <input
            {...props}
            name={props.name}
            className={inputClassName}
            ref={ref}
          />
        )}
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
