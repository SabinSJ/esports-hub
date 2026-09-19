import type { LoginForm, RegisterForm, ErrorForm } from '@/types/auth';

export function validateLogin(values: LoginForm): ErrorForm {
  const errors: ErrorForm = {};

  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = 'Enter a valid email.';

  if (!values.password) errors.password = 'Password is required.';

  return errors;
}

export function validateRegister(values: RegisterForm): ErrorForm {
  const errors: ErrorForm = {};

  if (!values.username.trim()) errors.username = 'Username is required.';

  if (!values.email.trim()) errors.email = 'Email is required.';
  else if (!/\S+@\S+\.\S+/.test(values.email))
    errors.email = 'Enter a valid email.';

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters.';
  }

  return errors;
}
