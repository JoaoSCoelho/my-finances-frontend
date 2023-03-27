import { IBankAccountObject } from '@/types/BankAccount';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsPencilFill } from 'react-icons/bs';

import AccountModal, { AccountForm } from './AccountModal';

interface IExistingAccountModalProps {
  modalState: [boolean, Dispatch<SetStateAction<boolean>>];
  trigger: JSX.Element | ((isOpen: boolean) => JSX.Element);
  bankAccount: IBankAccountObject;
}

export default function ExistingAccountModal({
  modalState: [modalOpen, setModalOpen],
  trigger,
  bankAccount,
}: IExistingAccountModalProps) {
  const form = useForm<AccountForm>({
    defaultValues: {
      amount: bankAccount.amount,
      imageURL: bankAccount.imageURL,
      name: bankAccount.name,
    },
  });
  const { reset } = form;

  const closeModal = () => {
    setModalOpen(false);
    reset();
  };

  const onSubmit: SubmitHandler<AccountForm> = (data) => {
    console.log(data);
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
    />
  );
}
