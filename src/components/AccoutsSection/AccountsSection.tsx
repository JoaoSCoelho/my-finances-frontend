import { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import NewAccountModal from '../AccountModal/NewAccountModal/NewAccountModal';
import DiscreetButton from '../DiscreetButton/DiscreetButton';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './AccountsSection.module.css';
import AccountsSlider from './AccountsSlider/AccountsSlider';

export default function AccountsSection() {
  const newAccountModalIsOpenState = useState(false);
  const existentAccountModalIsOpenState = useState(false);
  const [newAccountModalIsOpen, setNewAccountModalIsOpen] = newAccountModalIsOpenState;

  // ------ Return ------

  return (
    <div>
      <NewAccountModal
        modalIsOpen={newAccountModalIsOpen}
        setModalIsOpen={setNewAccountModalIsOpen}
      />

      <section className={styles.accountsSection}>
        <SectionHeader
          title="Suas contas"
          button={
            <DiscreetButton
              className={styles.headerNewAccountButton}
              onClick={() => setNewAccountModalIsOpen(true)}
              symbol={<AiFillPlusCircle />}
            >
              Criar conta
            </DiscreetButton>
          }
        />

        <div className={styles.accountsContainer}>
          <AccountsSlider
            newAccountModalIsOpenState={newAccountModalIsOpenState}
            existentAccountModalIsOpenState={existentAccountModalIsOpenState}
          />
        </div>
      </section>
    </div>
  );
}
