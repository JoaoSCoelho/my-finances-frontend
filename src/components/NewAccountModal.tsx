import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import AccountModal, { AccountForm, accountSchema } from './AccountModal';

interface INewAccountModalProps {
  setBankAccounts: Dispatch<SetStateAction<IBankAccountObject[] | undefined>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NewAccountModal({
  modalOpen,
  setModalOpen,
  setBankAccounts,
}: INewAccountModalProps) {
  const auth = useContext(AuthContext);

  const form = useForm<AccountForm>({ resolver: yupResolver(accountSchema) });
  const { setError, reset } = form;

  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const onSubmit = (data: AccountForm) => {
    api
      .post('bankaccounts', data, {
        headers: { Authorization: `Bearer ${auth.getAccessToken()}` },
      })
      .then((response) => {
        setBankAccounts((values) => [
          ...(values || []),
          response.data.bankAccount,
        ]);
        closeModal();
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
      modalTitle="Nova conta"
      inputAmountLabel="Montante inicial"
      submitButton={{
        value: 'Criar',
        symbol: <AiFillPlusCircle />,
      }}
      modalOpen={modalOpen}
    />
  );
}
