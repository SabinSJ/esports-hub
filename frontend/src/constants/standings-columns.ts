export type StandingStatKey =
  | 'played'
  | 'wins'
  | 'losses'
  | 'rounds'
  | 'points';

export interface StandingsColumn {
  key: StandingStatKey;
  label: string;
  align: 'left' | 'center';
  className: string;
}

const roundsColumn: StandingsColumn = {
  key: 'rounds',
  label: 'Rounds',
  align: 'center',
  className: 'font-mono text-[10px] text-[#5E6A7E]',
};

export function getStandingsColumns(compact = false): StandingsColumn[] {
  return [
    // { key: 'played', label: 'P', align: 'center', className: 'colPlayed' },
    { key: 'wins', label: 'W', align: 'center', className: 'colWins' },
    { key: 'losses', label: 'L', align: 'center', className: 'colLosses' },
    // ...(!compact ? [roundsColumn] : []),
    { key: 'points', label: 'PTS', align: 'center', className: 'colPoints' },
  ];
}
