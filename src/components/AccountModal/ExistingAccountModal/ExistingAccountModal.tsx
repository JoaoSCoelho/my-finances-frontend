import { AuthContext } from '@/contexts/auth';
import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

import Button from '../../Button/Button';
import AccountModal, { AccountForm, accountSchema } from '../AccountModal';
import styles from './ExistingAccountModal.module.css';

interface IExistingAccountModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
  bankAccount: IBankAccountObject & { totalAmount: number };
}

export default function ExistingAccountModal({
  modalOpen,
  setModalOpen,
  trigger,
  bankAccount,
}: IExistingAccountModalProps) {
  const form = useForm<AccountForm>({
    defaultValues: {
      totalAmount: bankAccount.totalAmount,
      initialAmount: bankAccount.initialAmount,
      imageURL: bankAccount.imageURL,
      name: bankAccount.name,
    },
    resolver: yupResolver(accountSchema),
  });
  const { setError } = form;
  const auth = useContext(AuthContext);
  const { mutate, bankAccounts } = useMyBankAccounts();

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data: AccountForm, close: () => any) => {
    const accessToken = auth.getAccessToken();
    const differenceBetweenInitialAmountAndOldInitialAmount =
      data.initialAmount - bankAccount.initialAmount;
    const transactionType =
      data.totalAmount >
      bankAccount.totalAmount + differenceBetweenInitialAmountAndOldInitialAmount
        ? 'income'
        : data.totalAmount <
          bankAccount.totalAmount + differenceBetweenInitialAmountAndOldInitialAmount
        ? 'expense'
        : undefined;

    transactionType &&
      (await api
        .post(
          `/transactions/${transactionType}s`,
          {
            bankAccountId: bankAccount.id,
            [transactionType === 'income' ? 'gain' : 'spent']:
              transactionType === 'income'
                ? data.totalAmount -
                  (bankAccount.totalAmount +
                    differenceBetweenInitialAmountAndOldInitialAmount)
                : bankAccount.totalAmount +
                  differenceBetweenInitialAmountAndOldInitialAmount -
                  data.totalAmount,
            title: '-- REAJUSTE --',
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then(() =>
          toast.info(
            'Uma nova transação foi criada para suprir o reajuste monetário',
            defaultToastOptions,
          ),
        )
        .catch((err) => {
          console.error(err);
          toast.error('Erro inesperado!');
          close();
        }));

    await api
      .put(
        `bankaccounts/${bankAccount.id}`,
        {
          ...data,
          imageURL: data.imageURL || null,
          totalAmount: undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((response) => {
        mutate(
          bankAccounts?.map((bankAccount) => {
            return bankAccount.id === response.data.bankAccount.id
              ? response.data.bankAccount
              : bankAccount;
          }),
          {
            revalidate: false,
          },
        );
        close();
      })
      .catch((err) => {
        console.error(err);

        const error = err.response?.data;
        if (!error) return toast.error('Erro inesperado!');

        if (error.reason === 'invalid characters')
          setError(error.paramName, { message: 'Caracteres inválidos' });
        if (error.reason === 'incorrect structure')
          setError(error.paramName, { message: 'Estrutura incorreta' });
        toast.error(error.error, defaultToastOptions);
      });
  };

  const deleteBankAccount = (close: () => any) => {
    api
      .delete(`bankaccounts/${bankAccount.id}`, {
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      })
      .then(async () => {
        mutate([]);
        close();
      });
  };

  return (
    <AccountModal
      inputTotalAmountVisible
      onSubmit={onSubmit}
      closeModal={closeModal}
      form={form}
      modalTitle="Editar conta"
      submitButton={{
        value: 'Salvar',
        symbol: <BsPencilFill />,
      }}
      modalOpen={modalOpen}
      trigger={trigger}
      otherButtons={(close) => [
        <Button
          onClick={() => deleteBankAccount(close)}
          symbol={<BsFillTrashFill />}
          className={styles.deleteBtn}
          key={`delete-button-${bankAccount.id}`}
        >
          Excluir
        </Button>,
      ]}
    />
  );
}
