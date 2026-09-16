'use client';

import Link from 'next/link';
import styles from './Auth.module.css';

const AuthLogin = () => {
  return (
    <>
      <h2 className={styles.title}>Welcome back</h2>
      <p className={styles.subtitle}>
        Sign in to follow your teams and track live results
      </p>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.field}>
          <label htmlFor="login-email" className={styles.label}>
            EMAIL
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="login-password" className={styles.label}>
            PASSWORD
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            className={styles.input}
          />
        </div>

        <div className={styles.forgotWrapper}>
          <Link href="#" className={styles.forgot}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" className={styles.submit}>
          Sign In
        </button>
      </form>
    </>
  );
};

export default AuthLogin;
