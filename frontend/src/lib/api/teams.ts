import { fetchApi } from '@/lib/api/client';
import { Standing, type Team } from '@/types/Team';

export const getTeams = () => fetchApi<Team[]>('/api/teams');
export const getTeamById = (id: string) => fetchApi<Team>(`/api/teams/${id}`);
export const getStandings = () => fetchApi<Standing[]>('/api/teams/standings');
