import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { IBankAccountObject } from '@/types/BankAccount';
import { Dispatch, SetStateAction, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import AccountModal, { AccountForm } from './AccountModal';

interface INewAccountModalProps {
  setBankAccounts: Dispatch<SetStateAction<IBankAccountObject[] | undefined>>;
  modalState: [boolean, Dispatch<SetStateAction<boolean>>];
}

export default function NewAccountModal({
  modalState: [modalOpen, setModalOpen],
  setBankAccounts,
}: INewAccountModalProps) {
  const auth = useContext(AuthContext);

  const form = useForm<AccountForm>();
  const { setError, reset } = form;

  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<AccountForm> = (data) => {
    console.log(data);

    if (data.name.length < 3 || data.name.length > 30)
      return setError('name', { message: 'Deve ter entre 3 e 30 caracteres' });
    if (
      data.amount < -999999999999 ||
      data.amount > 999999999999 ||
      !Number.isSafeInteger(Math.round(data.amount))
    )
      return setError('amount', {
        message: 'Deve ser menor que um trilhão',
      });

    api
      .post('bankaccounts', data, {
        headers: { Authorization: `Bearer ${auth.getToken()}` },
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
