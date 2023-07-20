import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { FaInfo, FaPiggyBank } from 'react-icons/fa';

import LandingImageSvg from '../components/images/LandingImageSvg/LandingImageSvg';
import styles from './Home.module.css';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <div className={styles.titleContainer}>
            <h1 className={styles.appName}>My Finances</h1>
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.callerAndButtonsContainer}>
              <p className={styles.caller}>Organize-se financeiramente e evite apertos</p>

              <div className={styles.buttonsContainer}>
                <Link href="/tutorial">
                  <FaInfo />
                  <span>Tutorial</span>
                </Link>
                <Link href="/auth/register">
                  <FaPiggyBank />
                  <span>Começar</span>
                </Link>
              </div>
            </div>

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
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
