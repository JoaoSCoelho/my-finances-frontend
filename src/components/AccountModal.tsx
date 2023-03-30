import useDebounce from '@/hooks/useDebounce';
import { defaultToastOptions } from '@/services/toast';
import { ReactNode, useEffect, useState } from 'react';
import {
  Control,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { Popup } from 'reactjs-popup';

import AccountCard from './AccountCard';
import styles from './AccountModal.module.css';
import Button from './Button';
import ControllerBRLFormat from './ControlledBRLFormat';
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
  otherButtons?: ReactNode[];
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
}

export type AccountForm = {
  name: string;
  amount: number;
  imageURL?: string;
};

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

  const onSubmitError: SubmitErrorHandler<AccountForm> = (errors) => {
    console.log(errors);
    toast.warn('Preencha todos os campos', defaultToastOptions);
  };

  useEffect(() => {
    const subscription = watch((data) => {
      debounce(() => {
        setData(data);
      });
    });

    return subscription.unsubscribe;
  }, [watch()]);

  useEffect(() => {
    setData(watch());
  }, []);

  return (
    <Popup
      open={modalOpen}
      onClose={closeModal}
      modal
      nested
      lockScroll
      className={popupClassName}
      trigger={trigger}
    >
      {
        ((close: () => any) => (
          <div className={styles.accountModal}>
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
                return handleSubmit(onSubmitClose, onSubmitError)(e);
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
                  wrapperClassName={styles.inputContainer}
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
                    <ControllerBRLFormat
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
                  wrapperClassName={styles.inputContainer}
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
                  wrapperClassName={styles.inputContainer}
                  className={styles.input}
                />
              </div>

              <div className={styles.buttonsContainer}>
                <Button type="submit" symbol={submitButton.symbol}>
                  {submitButton.value}
                </Button>
                {otherButtons}
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
