'use client';

import Image from 'next/image';

import googleLogo from '../../../public/logos/google-logo.png';
import githubLogo from '../../../public/logos/github-logo.png';

import styles from './AuthProviders.module.css';

const AuthProviders = () => {
  const onClick = (api: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${api}`;
  };

  return (
    <div className={styles.authProvidersContainer}>
      <button
        className={styles.googleBtn}
        onClick={() => onClick('google')}
        type="button"
      >
        <div className={styles.iconWrapper}>
          <Image
            src={googleLogo}
            alt="Google Logo"
            className={styles.googleIcon}
          />
        </div>
        <span className={styles.btnText}>Sign in with Google</span>
      </button>

      <button
        className={styles.googleBtn}
        onClick={() => onClick('github')}
        type="button"
      >
        <div className={styles.iconWrapper}>
          <Image
            src={githubLogo}
            alt="Github Logo"
            className={styles.googleIcon}
          />
        </div>
        <span className={styles.btnText}>Sign in with Github</span>
      </button>
    </div>
  );
};

export default AuthProviders;
