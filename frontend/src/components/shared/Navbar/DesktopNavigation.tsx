import Link from 'next/link';

import styles from './Navbar.module.css';

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  items: NavItem[];
  isActive: (href: string) => boolean;
}

const DesktopNavigation = ({ items, isActive }: Props) => {
  return (
    <div className={styles.navDesktop}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={isActive(item.href) ? styles.navActive : styles.navLink}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default DesktopNavigation;
