import { type Team } from '@/types/Team';
import { fetchApiServer } from './server';

export const isFavoriteTeam = (id: string) =>
  fetchApiServer<boolean>(`/api/user/favorites/teams/${id}`);
export const getFavoriteTeams = () =>
  fetchApiServer<Team[]>('/api/user/favorites/teams');
export const addFavoriteTeam = (id: number) =>
  fetchApiServer(`/api/user/favorites/teams/${id}`, { method: 'POST' });
export const removeFavoriteTeam = (id: number) =>
  fetchApiServer(`/api/user/favorites/teams/${id}`, { method: 'DELETE' });
