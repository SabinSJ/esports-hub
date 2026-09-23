'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchApiServer<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
