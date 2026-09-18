import type { Tournament, TournamentOption } from '@/types/Tournament';

export const filterConfig = {
  tournament: {
    getOptions: (tournaments: TournamentOption[]) =>
      tournaments.map((t) => ({
        value: String(t.id),
        label: t.name,
      })),
  },

  region: {
    getOptions: (regions: string[]) => [
      { value: 'all', label: 'All Regions' },
      ...regions.map((region) => ({
        value: region,
        label: region,
      })),
    ],
  },
};
