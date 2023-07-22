'use client';

import AccountCard from '@/components/AccountCard/AccountCard';
import ExistingAccountModal from '@/components/AccountModal/ExistingAccountModal/ExistingAccountModal';
import NewAccountModal from '@/components/AccountModal/NewAccountModal/NewAccountModal';
import DiscreetButton from '@/components/DiscreetButton/DiscreetButton';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import { useMyBankAccounts } from '@/hooks/useMyBankAccounts';
import { defaultToastOptions } from '@/services/toast';
import { useState, useRef } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

import styles from './Dashboard.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Dashboard() {
  const [newAccountModalOpen, setNewAccountModalOpen] = useState<boolean>(false);
  const [existingAccountModalOpen, setExistingAccountModalOpen] =
    useState<boolean>(false);
  const slider = useRef<Slider>(null);

  const openNewAccountModal = () => setNewAccountModalOpen(true);
  const openExistingAccountModal = () => setExistingAccountModalOpen(true);

  return (
    <>
      {/* Abre ao tentar criar uma nova conta */}
      <NewAccountModal
        modalOpen={newAccountModalOpen}
        setModalOpen={setNewAccountModalOpen}
      />

      <section className={styles.accountsSection}>
        <SectionHeader_Local />

        <div className={styles.accountsContainer}>
          <AccountsSlider_Local />
        </div>
      </section>
    </>
  );

  // Componentes locais
  function SectionHeader_Local() {
    return (
      <SectionHeader
        title="Suas contas"
        button={
          <DiscreetButton
            className={styles.headerNewAccountBtn}
            type="button"
            onClick={openNewAccountModal}
            symbol={<AiFillPlusCircle />}
          >
            Criar conta
          </DiscreetButton>
        }
      />
    );
  }

  function AccountsSlider_Local() {
    const swrBankAccounts = useMyBankAccounts();
    const { bankAccounts, isLoading, error } = swrBankAccounts;

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

    if (isLoading || error) return <AccountsSkeleton_Local />;

    console.log(swrBankAccounts);

    return (
      <div className={styles.sliderContainer}>
        <button
          className={`${styles.sliderArrowBtn} ${styles.prev}`}
          onClick={() => slider.current?.slickPrev()}
        >
          <MdNavigateBefore className={styles.sliderArrow} />
        </button>

        <Slider
          ref={slider}
          arrows={false}
          draggable
          speed={500}
          infinite={false}
          slidesToScroll={1}
          variableWidth
        >
          <AccountCard
            isTotal
            amount={bankAccounts!.reduce((prev, curr) => prev + curr.totalAmount, 0)}
          />
          {bankAccounts!.map((bankAccount) => (
            <ExistingAccountModal
              trigger={
                <button type="button" onClick={openExistingAccountModal}>
                  <AccountCard
                    key={bankAccount.id}
                    amount={bankAccount.totalAmount}
                    imageSrc={bankAccount.imageURL}
                    name={bankAccount.name}
                  />
                </button>
              }
              modalOpen={existingAccountModalOpen}
              setModalOpen={setExistingAccountModalOpen}
              key={bankAccount.id}
              bankAccount={bankAccount}
            />
          ))}
          <div className={styles.accountCardWrapper}>
            <button
              onClick={openNewAccountModal}
              type="button"
              className={`${styles.newAccountCard}`}
            >
              <span className={styles.newAccountText}>Criar nova</span>
              <AiFillPlusCircle className={styles.newAccountSymbol} />
            </button>
          </div>
        </Slider>

        <button
          className={`${styles.sliderArrowBtn} ${styles.next}`}
          onClick={() => slider.current?.slickNext()}
        >
          <MdNavigateNext className={styles.sliderArrow} />
        </button>
      </div>
    );
  }

  function AccountsSkeleton_Local() {
    return (
      <SkeletonTheme
        width={283}
        height={100}
        inline
        borderRadius="8px"
        baseColor="#e4e4e4"
      >
        <div className={styles.skeletonAccountCardContainer}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </SkeletonTheme>
    );
  }
}
