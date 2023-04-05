'use client';

import AccountCard from '@/components/AccountCard';
import DiscreetButton from '@/components/DiscreetButton';
import ExistingAccountModal from '@/components/ExistingAccountModal';
import NewAccountModal from '@/components/NewAccountModal';
import { AuthContext } from '@/contexts/auth';
import api from '@/services/api';
import { IBankAccountObject } from '@/types/BankAccount';
import { useContext, useEffect, useState, useRef } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import Slider from 'react-slick';

import styles from './Dashboard.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function DashBoard() {
  const [newAccountModalOpen, setNewAccountModalOpen] =
    useState<boolean>(false);
  const [existingAccountModalOpen, setExistingAccountModalOpen] =
    useState<boolean>(false);
  const [bankAccounts, setBankAccounts] = useState<IBankAccountObject[]>();
  const auth = useContext(AuthContext);
  const slider = useRef<Slider>(null);

  const openNewAccountModal = () => setNewAccountModalOpen(true);
  const openExistingAccountModal = () => setExistingAccountModalOpen(true);

  useEffect(() => {
    if (bankAccounts === undefined)
      api
        .get('bankaccounts/my', {
          headers: { Authorization: `Bearer ${auth.getToken()}` },
        })
        .then(({ data: { bankAccounts } }) => {
          bankAccounts && setBankAccounts(bankAccounts);
        });
  }, [bankAccounts]);

  return (
    <>
      <NewAccountModal
        modalOpen={newAccountModalOpen}
        setModalOpen={setNewAccountModalOpen}
        setBankAccounts={setBankAccounts}
      />

      <section className={styles.accountsSection}>
        <header className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Suas contas</h2>
          <div className={styles.centerLine} />
          <DiscreetButton
            className={styles.newAccountBtn}
            type="button"
            onClick={openNewAccountModal}
            symbol={<AiFillPlusCircle />}
          >
            Criar conta
          </DiscreetButton>
        </header>

        <div className={styles.accountsContainer}>
          {bankAccounts ? (
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
                slidesToScroll={3}
                variableWidth
              >
                <AccountCard
                  isTotal
                  amount={bankAccounts.reduce(
                    (prev, curr) => prev + curr.amount,
                    0,
                  )}
                />
                {bankAccounts.map((bankAccount) => (
                  <ExistingAccountModal
                    trigger={
                      <button type="button" onClick={openExistingAccountModal}>
                        <AccountCard
                          key={bankAccount.id}
                          amount={bankAccount.amount}
                          imageSrc={bankAccount.imageURL}
                          name={bankAccount.name}
                        />
                      </button>
                    }
                    modalOpen={existingAccountModalOpen}
                    setModalOpen={setExistingAccountModalOpen}
                    key={bankAccount.id}
                    bankAccount={bankAccount}
                    bankAccounts={bankAccounts}
                    setBankAccounts={setBankAccounts}
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
          ) : (
            <span>Carregando...</span>
          )}
        </div>
      </section>
    </>
  );
}
