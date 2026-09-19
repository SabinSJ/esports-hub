import { fetchApi } from '@/lib/api/client';

import { LoginForm, RegisterForm } from '@/types/auth';

export const register = (data: RegisterForm) =>
  fetchApi<RegisterForm>('/api/auth/register', {
    method: 'POST',
    body: data,
  });

export const login = (data: LoginForm) =>
  fetchApi<{ ok: boolean }>('/api/auth/login', {
    method: 'POST',
    body: data,
  });

export const logout = () =>
  fetchApi<{ ok: boolean }>('/api/auth/logout', {
    method: 'POST',
  });
