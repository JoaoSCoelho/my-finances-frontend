import useDebounce from '@/hooks/useDebounce';
import { ReactNode, useEffect, useState } from 'react';
import { Control, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { Popup } from 'reactjs-popup';
import * as yup from 'yup';

import AccountCard from './AccountCard';
import styles from './AccountModal.module.css';
import Button from './Button';
import ControlledBRLFormat from './ControlledBRLFormat';
import Input from './Input';

import './AccountModal.css';

interface IAccountModalProps {
  modalOpen: boolean;
  closeModal: () => void;
  popupClassName?: string;
  onSubmit: (data: AccountForm, close: () => any) => any;
  form: UseFormReturn<AccountForm>;
  modalTitle: string;
  inputNameLabel?: string;
  inputAmountLabel?: string;
  inputImageURLLabel?: string;
  submitButton: {
    value: string;
    symbol?: ReactNode;
  };
  otherButtons?: (close: () => any) => ReactNode[];
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
}

export const accountSchema = yup
  .object({
    name: yup
      .string()
      .required('Campo obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(30, 'Máximo de 30 caracteres')
      .matches(
        /^[\dA-Za-záàâãäéèêëíïìîóôõöòúùûüçñÁÀÂÃÄÉÈÊËÍÏÌÎÓÔÕÖÒÚÙÛÜÇÑ !@#$%¨&*_()+=\-:/'",§<>.|`´^~ºª?°]+$/gi,
        'Pode ter apenas caracteres alfanuméricos (alguns deles acentuados), espaços, underlines e alguns caracteres especiais',
      ),
    amount: yup
      .number()
      .required('Campo obrigatório')
      .min(-999999999999, 'Mínimo: -1 trilhão')
      .max(999999999999, 'Máximo: 1 trilhão'),
    imageURL: yup
      .string()
      .matches(/^((http)|(https)):\/\/.+\..+(\/.+)?$/gi, {
        excludeEmptyString: true,
        message: 'URL inválida',
      })
      .notRequired(),
  })
  .required();

export type AccountForm = yup.InferType<typeof accountSchema>;

export default function AccountModal({
  modalOpen,
  closeModal,
  popupClassName = 'account-popup',
  onSubmit,
  form: {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  },
  modalTitle,
  inputAmountLabel = 'Montante',
  inputImageURLLabel = 'URL da imagem',
  inputNameLabel = 'Nome da conta',
  submitButton,
  otherButtons,
  trigger,
}: IAccountModalProps) {
  const [data, setData] = useState<Partial<AccountForm>>();

  const debounce = useDebounce();

  // Set data when formData changes
  useEffect(() => {
    const subscription = watch((data) => {
      debounce(() => {
        setData(data);
      });
    });

    return subscription.unsubscribe;
  }, [watch()]);

  // Set data on first rendering
  useEffect(() => {
    setData(watch());
  }, []);

  return (
    <Popup
      open={modalOpen}
      onClose={closeModal}
      onOpen={() => {
        (
          document.querySelector('.account-modal form input#account-name') as
            | HTMLInputElement
            | undefined
        )?.focus();
      }}
      modal
      nested
      lockScroll
      className={popupClassName}
      trigger={trigger}
    >
      {
        ((close: () => any) => (
          <div className={`account-modal ${styles.accountModal}`}>
            <header className={styles.modalHeader}>
              <button className={styles.closeBtn} type="button" onClick={close}>
                <IoClose />
              </button>
            </header>

            <strong className={styles.modalTitle}>{modalTitle}</strong>

            <form
              onSubmit={(e) => {
                const onSubmitClose: SubmitHandler<AccountForm> = (data) =>
                  onSubmit(data, close);
                return handleSubmit(onSubmitClose)(e);
              }}
              className={styles.accountForm}
            >
              <div className={styles.inputsContainer}>
                <Input
                  {...register('name', { required: true })}
                  errors={errors}
                  required
                  type="text"
                  id="account-name"
                  placeholder="Ex: Banco do Brasil"
                  label
                  labelValue={inputNameLabel}
                  name="name"
                  wrapperClassName={styles.inputWrapper}
                  containerClassName={styles.inputContainer}
                  className={styles.input}
                />
                <Input
                  errors={errors}
                  required
                  inputEl={({
                    type: _type,
                    value: _value,
                    defaultValue: _defaultValue,
                    ...props
                  }) => (
                    <ControlledBRLFormat
                      {...props}
                      control={control as unknown as Control}
                      name="amount"
                      id="account-amount"
                      placeholder="R$ 0,00"
                      max={1000000000000}
                      min={-1000000000000}
                      maxLength={24}
                    />
                  )}
                  id="account-amount"
                  label
                  labelValue={inputAmountLabel}
                  name="amount"
                  wrapperClassName={styles.inputWrapper}
                  containerClassName={styles.inputContainer}
                  className={styles.input}
                />
                <Input
                  {...register('imageURL')}
                  errors={errors}
                  type="text"
                  id="account-imageURL"
                  label
                  labelValue={inputImageURLLabel}
                  name="imageURL"
                  wrapperClassName={styles.inputWrapper}
                  containerClassName={styles.inputContainer}
                  className={styles.input}
                />
              </div>

              <div className={styles.buttonsContainer}>
                <Button type="submit" symbol={submitButton.symbol}>
                  {submitButton.value}
                </Button>
                {otherButtons?.(close)}
              </div>
            </form>

            <AccountCard
              amount={data?.amount || 0}
              name={data?.name || 'Nome da conta'}
              imageSrc={data?.imageURL}
            />
          </div>
        )) as unknown as ReactNode
      }
    </Popup>
  );
}
