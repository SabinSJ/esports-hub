'use client';

import { useState } from 'react';

import styles from './UserDropdown.module.css';

interface Props {
  onLogout: () => Promise<void>;
}

const UserDropdown = ({ onLogout }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.dropdownWrapper}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={styles.userButton}
      >
        <div className={styles.avatar}>SS</div>

        <span className={styles.username}>Username</span>
      </button>

      {open && (
        <div className={styles.userDropdown}>
          {/* account information */}

          {/* menu items */}

          <button
            type="button"
            onClick={onLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
