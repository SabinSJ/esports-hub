import { Match } from '@/types/Match';
import { Player } from '@/types/Player';

export interface TeamSummary {
  id: number;
  name: string;
  region: string;
  logoUrl: string;
}

export interface Team {
  id: number;
  name: string;
  region: string;
  logoUrl: string;
  players: Player[];
  wins: number;
  losses: number;
  ranking: number;
  winRate: number;
  matches: Match[];
  recentResults: string[];
}

export interface Standing {
  rank: number;
  teamId: number;
  teamName: string;
  region: string;
  logoUrl: string;
  matchesPlayed: number;
  wins: number;
  losses: number;
  points: number;
  winRate: number;

  [key: string]: any;
}
