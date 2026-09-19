'use client';

import { useAuthForm } from '@/hooks/useAuthForm';

import { RegisterForm } from '@/types/auth';

import { register } from '@/lib/api/auth';
import { validateRegister } from '@/lib/validators/auth';

import InputField from '../shared/InputField';

import styles from './Auth.module.css';

const AuthRegister = () => {
  const { values, errors, loading, handleChange, handleSubmit } =
    useAuthForm<RegisterForm>({
      initialValues: {
        username: '',
        email: '',
        password: '',
      },
      validate: validateRegister,
      onSubmit: async (form) => {
        await register({
          username: form.username,
          email: form.email,
          password: form.password,
        });
      },
    });

  return (
    <>
      <h2 className={styles.title}>Create your account</h2>
      <p className={styles.subtitle}>
        Join to start tracking teams and tournaments
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          label="USERNAME"
          name="username"
          placeholder="Enter your username"
          value={values.username}
          onChange={handleChange}
          error={errors.username}
        />

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

        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </>
  );
};

export default AuthRegister;
