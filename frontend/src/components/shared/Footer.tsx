import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logoBox}>
            <span className={styles.logoText}>EH</span>
          </div>
          <span className={styles.brandName}>Esports Hub</span>
        </div>

        <span className={styles.note}>Portfolio project</span>
      </div>
    </footer>
  );
};

export default Footer;
