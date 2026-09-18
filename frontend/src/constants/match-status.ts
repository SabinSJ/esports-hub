export const matchStatusLabels = {
  Scheduled: 'Upcoming',
  Live: '● Live',
  Finished: 'Final',
} as const;

export type MatchStatus = keyof typeof matchStatusLabels;
