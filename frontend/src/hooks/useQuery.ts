import { useCallback, useEffect, useState } from 'react';

export function useQuery<T>(queryFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await queryFn();
      setData(result);
    } catch {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}
