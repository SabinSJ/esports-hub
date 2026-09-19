import type { TournamentOption } from '@/types/Tournament';

export const filterConfig = {
  tournament: {
    getOptions: (tournament: TournamentOption[]) => [
      { value: 'All', label: 'All Tournaments' },
      ...tournament.map((t) => ({
        value: String(t.id),
        label: t.name,
      })),
    ],
  },

  region: {
    getOptions: (regions: string[]) => [
      { value: 'All', label: 'All Regions' },
      ...regions.map((region) => ({
        value: region,
        label: region,
      })),
    ],
  },
};
