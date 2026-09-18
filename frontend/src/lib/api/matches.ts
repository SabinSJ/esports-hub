import { fetchApi } from '@/lib/api/client';
import type { Match } from '@/types/Match';

export const getMatches = () => fetchApi<Match[]>('/api/matches');
export const getMatchById = (id: string) =>
  fetchApi<Match>(`/api/matches/${id}`);
