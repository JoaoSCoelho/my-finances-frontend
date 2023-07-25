import FullInput from '@/components/FullInput/FullInput';
import {
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';

import Loading from '../../../Loading/Loading';
import styles from './AuthForm.module.css';

export interface IAuthFormProps<FormData extends FieldValues = FieldValues> {
  form: UseFormReturn<FormData>;
  type: 'login' | 'register';
  isSubmitting: boolean;
  onFormSubmit: SubmitHandler<FormData>;
  onFormSubmitError?: SubmitErrorHandler<FormData>;
}

type FormInput = {
  name: string;
  type: string;
  placeholder: string;
  haveEye?: boolean;
  shouldAppear?: ((formType: IAuthFormProps['type']) => boolean) | boolean;
};

export default function AuthForm<FormData extends FieldValues = FieldValues>({
  form: {
    handleSubmit,
    register,
    formState: { errors: formErrors },
  },
  type,
  isSubmitting,
  onFormSubmit,
  onFormSubmitError,
}: IAuthFormProps<FormData>) {
  const formInputs: FormInput[] = [
    {
      name: 'username',
      placeholder: 'Nome de usuário',
      type: 'text',
      shouldAppear: (formType) => formType === 'register',
    },
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email',
    },
    {
      name: 'password',
      placeholder: 'Senha',
      type: 'password',
      haveEye: true,
    },
  ];

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onFormSubmit, onFormSubmitError)}
      >
        <div className={styles.inputsContainer}>
          {formInputs.map(
            (formInput) =>
              (typeof formInput.shouldAppear === 'function'
                ? formInput.shouldAppear(type)
                : formInput.shouldAppear ?? true) && (
                <FullInput
                  {...register(formInput.name as Path<FormData>)}
                  type={formInput.type}
                  id={`${formInput.name}-input`}
                  placeholder={formInput.placeholder}
                  errors={formErrors}
                  className={styles.input}
                  containerClassName={styles.inputContainer}
                  haveEye={formInput.haveEye}
                  key={`auth-form-input-${formInput.name}`}
                />
              ),
          )}
        </div>

        <button className={styles.submitBtn} type="submit">
          {isSubmitting ? <Loading /> : <FaArrowRight />}
        </button>
      </form>
    </>
  );
}
