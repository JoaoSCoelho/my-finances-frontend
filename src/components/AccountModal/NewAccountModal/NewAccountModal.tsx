import { AuthContext } from '@/contexts/auth';
import { useMe } from '@/hooks/useMe';
import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import api from '@/services/api';
import { defaultToastOptions } from '@/services/toast';
import { UseStateReturn } from '@/types/UseStateReturn';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillPlusCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

import AccountModal, { AccountForm } from '../AccountModal';
import { accountSchema } from '../yup';

interface INewAccountModalProps {
  modalIsOpenState: UseStateReturn<boolean>;
}

export default function NewAccountModal({
  modalIsOpenState: [modalIsOpen, setModalIsOpen],
}: INewAccountModalProps) {
  const auth = useContext(AuthContext);

  const { offMutate, revalidate, bankAccounts, refetch } = useMyBankAccounts();
  const { user } = useMe();

  const form = useForm<AccountForm>({ resolver: yupResolver(accountSchema) });

  // ------------ Functions ------------

  function closeModal() {
    setModalIsOpen(false);
    form.reset();
  }

  function onSubmit(data: AccountForm) {
    api
      .post('bankaccounts', data, auth.getAuthConfig())
      .then(() => revalidate())
      .catch((err) => {
        refetch();
        toast.error(
          `Erro ao criar conta bancária: ${err.response?.data || 'Erro inesperado!'}`,
          defaultToastOptions,
        );
      });

    offMutate([
      ...(bankAccounts || []),
      {
        ...data,
        imageURL: data.imageURL || undefined,
        id: 'new-bank-account',
        userId: user?.id || 'default-user-id',
        createdTimestamp: Date.now(),
        totalAmount: data.initialAmount,
      },
    ]);
    closeModal();
  }

  // ------------ Return ------------

  return (
    <AccountModal
      onSubmit={onSubmit}
      closeModal={closeModal}
      form={form}
      modalTitle="Nova conta"
      submitButton={{
        value: 'Criar',
        symbol: <AiFillPlusCircle />,
      }}
      modalIsOpen={modalIsOpen}
    />
  );
}
