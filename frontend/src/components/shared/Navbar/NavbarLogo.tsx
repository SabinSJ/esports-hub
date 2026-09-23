import Link from 'next/link';

import styles from './Navbar.module.css';

const NavbarLogo = () => {
  return (
    <Link href="/" className={styles.logo}>
      ESPORTS<span className={styles.logoDim}>HUB</span>
    </Link>
  );
};

export default NavbarLogo;
