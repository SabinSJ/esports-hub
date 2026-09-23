'use client';

import Link from 'next/link';

import styles from './Navbar.module.css';

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  items: NavItem[];
  isActive: (href: string) => boolean;
  isLoggedIn: boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
}

const MobileMenu = ({
  items,
  isActive,
  isLoggedIn,
  onClose,
  onLogout,
}: Props) => {
  return (
    <div className={styles.mobileMenu}>
      <div className={styles.mobileList}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={
              isActive(item.href) ? styles.mobileActive : styles.mobileLink
            }
          >
            {item.label}
          </Link>
        ))}

        {isLoggedIn ? (
          <div className={styles.mobileAccount}>
            <Link
              href="/profile"
              onClick={onClose}
              className={styles.mobileLink}
            >
              Profile
            </Link>

            <Link
              href="/favorites"
              onClick={onClose}
              className={styles.mobileLink}
            >
              Favorite Teams
            </Link>

            <Link
              href="/predictions"
              onClick={onClose}
              className={styles.mobileLink}
            >
              My Predictions
            </Link>

            <Link
              href="/notifications"
              onClick={onClose}
              className={styles.mobileLink}
            >
              Notifications
            </Link>

            <button
              type="button"
              onClick={onLogout}
              className={styles.mobileLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" onClick={onClose} className={styles.mobileLogin}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
