export type TournamentStatus = 'Live' | 'Finished' | 'Upcoming';

export type TournamentFilter = TournamentStatus | 'All';

export type TournamentOption = {
  id: string | number;
  name: string;
};

export interface Tournament {
  id: number;
  name: string;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
  region: string;
  prizePool: number;
  teamCount: number;
}
