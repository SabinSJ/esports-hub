'use client';

import styles from './Auth.module.css';

const AuthRegister = () => {
  return (
    <>
      <h2 className={styles.title}>Create your account</h2>
      <p className={styles.subtitle}>
        Join to start tracking teams and tournaments
      </p>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.field}>
          <label htmlFor="register-email" className={styles.label}>
            EMAIL
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="register-password" className={styles.label}>
            PASSWORD
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submit}>
          Create account
        </button>
      </form>
    </>
  );
};

export default AuthRegister;
