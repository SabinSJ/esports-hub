'use client';

import { useRouter } from 'next/navigation';
import { useAuthForm } from '@/hooks/useAuthForm';

import Link from 'next/link';

import type { LoginForm } from '@/types/auth';

import { login } from '@/lib/api/auth';
import { validateLogin } from '@/lib/validators/auth';

import InputField from '@/components/shared/InputField';

import styles from './Auth.module.css';

const AuthLogin = () => {
  const router = useRouter();
  const { values, errors, loading, handleChange, handleSubmit } =
    useAuthForm<LoginForm>({
      initialValues: {
        email: '',
        password: '',
      },
      validate: validateLogin,
      onSubmit: async (form) => {
        await login({
          email: form.email,
          password: form.password,
        });
        router.replace('/');
      },
    });

  return (
    <>
      <h2 className={styles.title}>Welcome back</h2>
      <p className={styles.subtitle}>
        Sign in to follow your teams and track live results
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          label="EMAIL"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="PASSWORD"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />

        {errors.general && (
          <p className={styles.errorMessage}>{errors.general}</p>
        )}

        <div className={styles.forgotWrapper}>
          <Link href="#" className={styles.forgot}>
            Forgot password?
          </Link>
        </div>

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </>
  );
};

export default AuthLogin;
