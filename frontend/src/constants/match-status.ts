export const matchStatusLabels = {
  upcoming: 'Upcoming',
  live: '● Live',
  completed: 'Final',
} as const;

export type MatchStatus = keyof typeof matchStatusLabels;
