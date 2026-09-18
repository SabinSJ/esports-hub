import { Team } from '@/types/Team';
import { Map } from '@/types/Map';

export type MatchStatus = 'Scheduled' | 'Live' | 'Finished';

export type MatchFormat = 'Bo1' | 'Bo3' | 'Bo5';

export interface Match {
  id: number;
  teamA: Team;
  teamB: Team;
  tournamentId: number;
  tournamentName: string;
  region: string;
  status: MatchStatus;
  format: MatchFormat;
  startTime: string;
  endTime: string | null;
  scoreA: number;
  scoreB: number;
  maps: Map[];
}
