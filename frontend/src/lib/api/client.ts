interface FetchApiOptions {
  method?: string;
  body?: unknown;
  headers?: HeadersInit;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
  }
}

export async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      data.message ?? `Request failed: ${response.status}`
    );
  }

  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}
