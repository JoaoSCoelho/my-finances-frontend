import { forwardRef, InputHTMLAttributes, ReactNode, Ref } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

import ErrorText from './ErrorText/ErrorText';
import styles from './FullInput.module.css';
import Input, { IInputProps } from './Input/Input';
import Label from './Label/Label';

interface IFullInputProps<FormData extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement>,
    IInputProps {
  errors: FieldErrors<FormData>;
  name: string;
  wrapperClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  label?: boolean;
  labelValue?: ReactNode;
  inputElement?: (
    props: Omit<
      IFullInputProps<FormData>,
      'inputElement' | 'containerClassName' | 'haveEye'
    > & {
      ref: Ref<HTMLElement>;
    },
  ) => ReactNode;
}

const FullInput = forwardRef(
  <FormData extends FieldValues>(
    {
      errors,
      wrapperClassName,
      errorClassName,
      labelClassName,
      containerClassName,
      eyeBtnClassName,
      label,
      labelValue,
      inputElement,
      haveEye,
      ...props
    }: IFullInputProps<FormData>,
    ref: Ref<HTMLInputElement>,
  ) => {
    const inputClassName = [props.className].join(' ');

    // ---------- Return ----------

    return (
      <div className={[styles.inputWrapper, wrapperClassName].join(' ')}>
        {/* Label */}
        {label && (
          <Label required={props.required} className={labelClassName} htmlFor={props.id}>
            {labelValue}
          </Label>
        )}

        {/* Input */}
        <div
          className={[
            styles.inputContainer,
            haveEye && styles.haveEye,
            errors[props.name] && styles.error,
            containerClassName,
          ].join(' ')}
        >
          {/* Se tem um elemento de input personalizado */}
          {inputElement ? (
            inputElement({ ...props, errors, className: inputClassName, ref })
          ) : (
            <Input
              {...props}
              className={inputClassName}
              haveEye={haveEye}
              eyeBtnClassName={eyeBtnClassName}
              ref={ref}
            />
          )}
        </div>

        {/* Error */}
        {errors[props.name] && (
          <ErrorText className={errorClassName}>
            {errors[props.name]?.message as string}
          </ErrorText>
        )}
      </div>
    );
  },
);

export default FullInput;
