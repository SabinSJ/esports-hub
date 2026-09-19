'use client';

import { useState } from 'react';

import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';

import { logout } from '@/lib/api/auth';

import styles from './Navbar.module.css';

interface Props {
  isLoggedIn: boolean;
}

const navItems = [
  { href: '/match', label: 'Matches' },
  { href: '/team', label: 'Teams' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/standings', label: 'Standings' },
];

export default function Navbar({ isLoggedIn }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname.startsWith(href);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setMobileOpen(false);
      router.replace('/');
      router.refresh();
    }
  };
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          ESPORTS<span className={styles.logoDim}>HUB</span>
        </Link>

        {/* Desktop navigation */}
        <div className={styles.navDesktop}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive(item.href) ? styles.navActive : styles.navLink
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Login button */}
        {isLoggedIn ? (
          <button
            type="button"
            onClick={handleLogout}
            className={styles.loginButton}
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className={styles.loginButton}>
            Sign In
          </Link>
        )}

        {/* Mobile button */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
          className={styles.mobileButton}
        >
          <span className={styles.mobileLine} />
          <span className={styles.mobileLine} />
          <span className={styles.mobileLine} />
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileList}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={
                  isActive(item.href) ? styles.mobileActive : styles.mobileLink
                }
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Login */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                className={styles.mobileLogin}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className={styles.mobileLogin}
              >
                Sign In →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
