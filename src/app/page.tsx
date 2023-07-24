'use client';

import Footer from '@/components/Footer/Footer';
import Art from '@/components/pages/home/Art/Art';
import Buttons from '@/components/pages/home/Buttons/Buttons';
import Title from '@/components/pages/home/Title/Title';

import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <Title />

          <div className={styles.contentContainer}>
            <div className={styles.callerAndButtonsContainer}>
              <p className={styles.caller}>Organize-se financeiramente e evite apertos</p>

              <Buttons />
            </div>

            <Art containerClassName={styles.artContainer} />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
