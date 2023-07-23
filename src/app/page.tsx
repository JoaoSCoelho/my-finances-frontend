'use client';

import BigSquareLink from '@/components/BigSquareLink/BigSquareLink';
import Footer from '@/components/Footer/Footer';
import { FaInfo, FaPiggyBank } from 'react-icons/fa';

import LandingImageSvg from '../components/images/LandingImageSvg/LandingImageSvg';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <Title_Local />

          <div className={styles.contentContainer}>
            <div className={styles.callerAndButtonsContainer}>
              <p className={styles.caller}>Organize-se financeiramente e evite apertos</p>

              <Buttons_Local />
            </div>

            <Art_Local />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );

  // local components

  function Title_Local() {
    return (
      <div className={styles.titleContainer}>
        <h1 className={styles.appName}>My Finances</h1>
      </div>
    );
  }

  function Buttons_Local() {
    return (
      <div className={styles.buttonsContainer}>
        <BigSquareLink
          style="white"
          value="Tutorial"
          href="/tutorial"
          icon={<FaInfo />}
        />
        <BigSquareLink
          style="green"
          value="Começar"
          href="/auth/register"
          icon={<FaPiggyBank />}
        />
      </div>
    );
  }

  function Art_Local() {
    return (
      <div className={styles.artContainer}>
        <div className={styles.art}>
          <LandingImageSvg />
        </div>
        <a
          className={styles.artAttribution}
          target="_blank"
          href="https://storyset.com/business"
        >
          Business illustrations by Storyset
        </a>
      </div>
    );
  }
}
