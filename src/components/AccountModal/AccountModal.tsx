import useDebounce from '@/hooks/useDebounce';
import React, { ReactNode, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Popup } from 'reactjs-popup';
import * as yup from 'yup';

import AccountCard from '../AccountCard/AccountCard';
import Button from '../Button/Button';
import './AccountModal.css';
import styles from './AccountModal.module.css';
import Header from './Header/Header';
import Inputs from './Inputs/Inputs';
import { accountSchema } from './yup';

interface IAccountModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  popupClassName?: string;
  onSubmit: (data: AccountForm, close: () => any) => any;
  form: UseFormReturn<AccountForm>;
  modalTitle: string;
  inputNameLabel?: string;
  inputInitialAmountLabel?: string;
  inputTotalAmountLabel?: string;
  inputTotalAmountVisible?: boolean;
  inputImageURLLabel?: string;
  submitButton: {
    value: string;
    symbol?: ReactNode;
  };
  otherButtons?: (close: () => any) => ReactNode[];
  trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element);
}

export type AccountForm = yup.InferType<typeof accountSchema>;

export default function AccountModal({
  modalIsOpen,
  closeModal,
  popupClassName = 'account-popup',
  onSubmit,
  form,
  modalTitle,
  inputTotalAmountLabel = 'Montante total',
  inputInitialAmountLabel = 'Montante inicial',
  inputImageURLLabel = 'URL da imagem',
  inputNameLabel = 'Nome da conta',
  submitButton,
  otherButtons,
  trigger,
  inputTotalAmountVisible,
}: IAccountModalProps) {
  const { handleSubmit, watch } = form;

  const [data, setData] = useState<Partial<AccountForm>>();

  const debounce = useDebounce();

  // Set data on first rendering
  useEffect(() => {
    const formData = watch();
    setData(formData);
  }, []);

  // Set data when formData changes
  useEffect(() => {
    const subscription = watch((data) => {
      debounce(() => setData(data));
    });

    return subscription.unsubscribe;
  }, [watch()]);

  return (
    <Popup
      open={modalIsOpen}
      onClose={closeModal}
      onOpen={focusFirstInput}
      modal
      nested
      lockScroll
      className={popupClassName}
      trigger={trigger}
    >
      {
        ((close: () => any) => (
          <div className={`account-modal ${styles.accountModal}`}>
            <Header close={close} />

            <strong className={styles.modalTitle}>{modalTitle}</strong>

            <form
              onSubmit={handleSubmit((data) => onSubmit(data, close))}
              className={styles.accountForm}
            >
              <div className={styles.inputsContainer}>
                <Inputs
                  data={data}
                  form={form}
                  inputImageURLLabel={inputImageURLLabel}
                  inputInitialAmountLabel={inputInitialAmountLabel}
                  inputNameLabel={inputNameLabel}
                  inputTotalAmountLabel={inputTotalAmountLabel}
                  inputTotalAmountVisible={inputTotalAmountVisible}
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
              amount={data?.totalAmount ?? 0}
              name={data?.name || 'Nome da conta'}
              imageSrc={data?.imageURL}
            />
          </div>
        )) as unknown as ReactNode
      }
    </Popup>
  );

  // ---------- Functions ----------

  function focusFirstInput() {
    const inputElement: HTMLInputElement | null = document.querySelector(
      '.account-modal form input#account-name',
    );

    inputElement?.focus();
  }
}
