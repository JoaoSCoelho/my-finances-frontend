import { AuthContext } from '@/contexts/auth';
import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import { useMyTransactions } from '@/hooks/useMyTransactions';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { UseStateReturn } from '@/types/UseStateReturn';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidSave } from 'react-icons/bi';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

import Button from '../../Button/Button';
import AccountModal, { AccountForm } from '../AccountModal';
import { accountSchema } from '../yup';
import styles from './ExistentAccountModal.module.css';

interface IExistentAccountModalProps {
  modalIsOpenState: UseStateReturn<boolean>;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
  bankAccount: IBankAccountObject & { totalAmount: number };
}

export default function ExistentAccountModal({
  modalIsOpenState: [modalIsOpen, setModalIsOpen],
  trigger,
  bankAccount,
}: IExistentAccountModalProps) {
  const form = useForm<AccountForm>({
    defaultValues: {
      totalAmount: bankAccount.totalAmount,
      initialAmount: bankAccount.initialAmount,
      imageURL: bankAccount.imageURL,
      name: bankAccount.name,
    },
    resolver: yupResolver(accountSchema),
  });
  const auth = useContext(AuthContext);
  const { offMutate, bankAccounts, revalidate, refetch } = useMyBankAccounts();
  const { revalidate: revalidateTransactions } = useMyTransactions();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onSubmit = async (data: AccountForm, close: () => any) => {
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

    try {
      if (transactionType) {
        await api.post(
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
          auth.getAuthConfig(),
        );
        revalidateTransactions();
        toast.info(
          'Uma nova transação foi criada para suprir o reajuste monetário',
          defaultToastOptions,
        );
      }

      await api.put(
        `bankaccounts/${bankAccount.id}`,
        {
          ...data,
          imageURL: data.imageURL || null,
          totalAmount: undefined,
        },
        auth.getAuthConfig(),
      );

      revalidate();
    } catch (error: any) {
      refetch();
      toast.error(
        `Erro ao atualizar conta bancária: ${
          error.response?.data?.error || 'Erro inesperado!'
        }`,
        defaultToastOptions,
      );
    }

    offMutate(
      bankAccounts?.map((ba) => {
        return bankAccount.id === ba.id
          ? { ...bankAccount, ...data, imageURL: data.imageURL ?? undefined }
          : ba;
      }),
    );
    close();
  };

  const deleteBankAccount = (close: () => any) => {
    api
      .delete(`bankaccounts/${bankAccount.id}`, auth.getAuthConfig())
      .then(() => {
        revalidate();
        revalidateTransactions();
      })
      .catch((error) => {
        refetch();
        toast.error(
          `Erro ao atualizar conta bancária: ${
            error.response?.data?.error || 'Erro inesperado!'
          }`,
          defaultToastOptions,
        );
      });

    offMutate(undefined);
    close();
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
        symbol: <BiSolidSave />,
      }}
      modalIsOpen={modalIsOpen}
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
