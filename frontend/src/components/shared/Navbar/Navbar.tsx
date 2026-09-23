'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { logout } from '@/lib/api/auth';

import NavbarLogo from '@/components/shared/Navbar/NavbarLogo';
import DesktopNavigation from '@/components/shared/Navbar/DesktopNavigation';
import NotificationDropdown from '@/components/shared/Navbar/NotificationDropdown';
import UserDropdown from '@/components/shared/Navbar/UserDropdown';
import MobileMenu from '@/components/shared/Navbar/MobileMenu';

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
      router.refresh();
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavbarLogo />

        <DesktopNavigation items={navItems} isActive={isActive} />

        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <NotificationDropdown />
              <UserDropdown onLogout={handleLogout} />
            </>
          ) : (
            <Link href="/login" className={styles.loginButton}>
              Sign In
            </Link>
          )}

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
        </div>
      </nav>

      {mobileOpen && (
        <MobileMenu
          items={navItems}
          isActive={isActive}
          isLoggedIn={isLoggedIn}
          onClose={() => setMobileOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
}
