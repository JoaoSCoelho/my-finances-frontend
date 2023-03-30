import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

import AccountModal, { AccountForm } from './AccountModal';
import Button from './Button';
import styles from './ExistingAccountModal.module.css';

interface IExistingAccountModalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
  bankAccount: IBankAccountObject;
  setBankAccounts: Dispatch<SetStateAction<IBankAccountObject[] | undefined>>;
}

export default function ExistingAccountModal({
  modalOpen,
  setModalOpen,
  trigger,
  bankAccount,
  setBankAccounts,
}: IExistingAccountModalProps) {
  const form = useForm<AccountForm>({
    defaultValues: {
      amount: bankAccount.amount,
      imageURL: bankAccount.imageURL,
      name: bankAccount.name,
    },
  });
  const { setError } = form;
  const auth = useContext(AuthContext);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data: AccountForm, close: () => any) => {
    console.log(data);

    await api
      .put(`bankaccounts/${bankAccount.id}`, data, {
        headers: {
          Authorization: `Bearer ${auth.getToken()}`,
        },
      })
      .then((response) => {
        setBankAccounts((values) =>
          values?.map((bankAccount) => {
            return bankAccount.id === response.data.bankAccount.id
              ? response.data.bankAccount
              : bankAccount;
          }),
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

  return (
    <AccountModal
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
      otherButtons={[
        <Button symbol={<BsFillTrashFill />} className={styles.deleteBtn}>
          Excluir
        </Button>,
      ]}
    />
  );
}
