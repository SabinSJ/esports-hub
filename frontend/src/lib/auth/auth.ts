import { cookies } from 'next/headers';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return false;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  return response.ok;
}
