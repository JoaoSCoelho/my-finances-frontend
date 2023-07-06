import styles from './SectionHeader.module.css';

interface ISectionHeaderProps {
  title: string;
  button?: JSX.Element;
}

export default function SectionHeader({ button, title }: ISectionHeaderProps) {
  return (
    <header className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {button && <div className={styles.centerLine} />}
      {button}
    </header>
  );
}
