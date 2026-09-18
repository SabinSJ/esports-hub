import { fetchApi } from '@/lib/api/client';
import { Tournament } from '@/types/Tournament';

export const getTournaments = () => fetchApi<Tournament[]>('/api/tournaments');
