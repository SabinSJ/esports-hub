import { Tournament } from '@/data/mock';

export const filterConfig = {
  tournament: {
    getOptions: (tournaments: Tournament[]) =>
      tournaments.map((t) => ({
        value: t.id,
        label: t.name,
      })),
  },

  region: {
    getOptiobs: (regions: string[]) => [
      { value: 'all', label: 'All Regions' },
      ...regions.map((region) => ({
        value: region,
        label: region,
      })),
    ],
  },
};
