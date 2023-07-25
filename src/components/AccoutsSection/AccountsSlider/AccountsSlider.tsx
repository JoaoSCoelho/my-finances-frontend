import AccountCard from '@/components/AccountCard/AccountCard';
import ExistentAccountModal from '@/components/AccountModal/ExistentAccountModal/ExistentAccountModal';
import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import { defaultToastOptions } from '@/services/toast';
import { UseStateReturn } from '@/types/UseStateReturn';
import { useRef } from 'react';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

import styles from './AccountsSlider.module.css';
import ArrowButton from './ArrowButton/ArrowButton';
import NewAccountCard from './NewAccountCard/NewAccountCard';
import SkeletonSlider from './SkeletonSlider/SkeletonSlider';

interface IAccountsSliderProps {
  newAccountModalIsOpenState: UseStateReturn<boolean>;
  existentAccountModalIsOpenState: UseStateReturn<boolean>;
}

export default function AccountsSlider({
  newAccountModalIsOpenState,
  existentAccountModalIsOpenState,
}: IAccountsSliderProps) {
  const [, setExistentAccountModalIsOpen] = existentAccountModalIsOpenState;

  const swrBankAccounts = useMyBankAccounts();
  const { bankAccounts, error } = swrBankAccounts;

  const sliderRef = useRef<Slider>(null);

  if (error) {
    toast.error(
      <span>
        Houve um erro ao buscar suas contas bancárias. Sentimos muito 😥.
        <br />
        Tente novamente mais tarde!
      </span>,
      { ...defaultToastOptions, toastId: 'bank-account-fetch-error' },
    );
  }

  if (!bankAccounts) return <SkeletonSlider />;

  return (
    <div className={styles.container}>
      <ArrowButton sliderRef={sliderRef} />

      <Slider
        ref={sliderRef}
        arrows={false}
        draggable
        speed={500}
        infinite={false}
        slidesToScroll={1}
        variableWidth
      >
        <AccountCard
          isTotal
          amount={bankAccounts.reduce((prev, curr) => prev + curr.totalAmount, 0)}
        />

        {bankAccounts.map((bankAccount) => (
          <ExistentAccountModal
            trigger={
              <button type="button" onClick={() => setExistentAccountModalIsOpen(true)}>
                <AccountCard
                  key={bankAccount.id}
                  amount={bankAccount.totalAmount}
                  imageSrc={bankAccount.imageURL}
                  name={bankAccount.name}
                />
              </button>
            }
            modalIsOpenState={existentAccountModalIsOpenState}
            key={bankAccount.id}
            bankAccount={bankAccount}
          />
        ))}

        <div className={styles.accountCardWrapper}>
          <NewAccountCard newAccountModalIsOpenState={newAccountModalIsOpenState} />
        </div>
      </Slider>

      <ArrowButton sliderRef={sliderRef} isNext />
    </div>
  );
}
