export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type TournamentStatus = 'upcoming' | 'live' | 'completed';
export type TournamentFilter = 'all' | 'live' | 'upcoming' | 'completed';
export type Tab = 'upcoming' | 'results';

export interface Team {
  id: string;
  name: string;
  short: string;
  region: string;
  ranking: number;
  color: string;
  wins: number;
  losses: number;
  players: Player[];
}

export interface Player {
  id: string;
  name: string;
  role: string;
  nationality: string;
}

export interface Tournament {
  id: string;
  name: string;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
  region: string;
  prizePool: string;
  teams: number;
}

export interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  scoreA?: number;
  scoreB?: number;
  status: MatchStatus;
  date: string;
  time: string;
  tournament: string;
  tournamentId: string;
  region: string;
  format: string;
  maps?: string[];
}

export interface Standing {
  rank: number;
  team: Team;
  played: number;
  wins: number;
  losses: number;
  rounds: string;
  points: number;
}

export const teams: Team[] = [
  {
    id: 'liquid',
    name: 'Team Liquid',
    short: 'TL',
    region: 'NA',
    ranking: 1,
    color: '#00A8E8',
    wins: 28,
    losses: 6,
    players: [
      { id: 'p1', name: 'Beaulo', role: 'Fragger', nationality: '🇺🇸 USA' },
      { id: 'p2', name: 'Ecl9pse', role: 'Support', nationality: '🇺🇸 USA' },
      { id: 'p3', name: 'Necrox', role: 'Flex', nationality: '🇧🇷 Brazil' },
      { id: 'p4', name: 'Gryxr', role: 'IGL', nationality: '🇺🇸 USA' },
      { id: 'p5', name: 'Rampy', role: 'Anchor', nationality: '🇺🇸 USA' },
    ],
  },
  {
    id: 'g2',
    name: 'G2 Esports',
    short: 'G2',
    region: 'EU',
    ranking: 2,
    color: '#FF4655',
    wins: 24,
    losses: 9,
    players: [
      { id: 'p6', name: 'Pengu', role: 'Flex', nationality: '🇩🇰 Denmark' },
      { id: 'p7', name: 'Virtue', role: 'Fragger', nationality: '🇬🇧 UK' },
      { id: 'p8', name: 'Ferral', role: 'IGL', nationality: '🇫🇷 France' },
      {
        id: 'p9',
        name: 'Kantoraketti',
        role: 'Support',
        nationality: '🇫🇮 Finland',
      },
      { id: 'p10', name: 'CTZN', role: 'Anchor', nationality: '🇬🇧 UK' },
    ],
  },
  {
    id: 'furia',
    name: 'FURIA Esports',
    short: 'FUR',
    region: 'BR',
    ranking: 3,
    color: '#FF6B00',
    wins: 21,
    losses: 10,
    players: [
      { id: 'p11', name: 'murizzz', role: 'Fragger', nationality: '🇧🇷 Brazil' },
      { id: 'p12', name: 'Xaninho', role: 'IGL', nationality: '🇧🇷 Brazil' },
      { id: 'p13', name: 'Bullet1', role: 'Support', nationality: '🇧🇷 Brazil' },
      { id: 'p14', name: 'HerdsZ', role: 'Flex', nationality: '🇧🇷 Brazil' },
      { id: 'p15', name: 'Lipe', role: 'Anchor', nationality: '🇧🇷 Brazil' },
    ],
  },
  {
    id: 'wolves',
    name: 'Wolves Esports',
    short: 'WLV',
    region: 'EU',
    ranking: 4,
    color: '#8B5CF6',
    wins: 18,
    losses: 13,
    players: [
      { id: 'p16', name: 'Stigi', role: 'IGL', nationality: '🇩🇪 Germany' },
      { id: 'p17', name: 'Mav', role: 'Fragger', nationality: '🇫🇷 France' },
      { id: 'p18', name: 'Cryn', role: 'Support', nationality: '🇵🇱 Poland' },
      { id: 'p19', name: 'Kendrew', role: 'Flex', nationality: '🇸🇪 Sweden' },
      { id: 'p20', name: 'BliTz', role: 'Anchor', nationality: '🇩🇪 Germany' },
    ],
  },
  {
    id: 'nip',
    name: 'Ninjas in Pyjamas',
    short: 'NiP',
    region: 'EU',
    ranking: 5,
    color: '#FFD700',
    wins: 16,
    losses: 15,
    players: [
      { id: 'p21', name: 'Hungry', role: 'IGL', nationality: '🇸🇪 Sweden' },
      { id: 'p22', name: 'Wokka', role: 'Fragger', nationality: '🇸🇪 Sweden' },
      { id: 'p23', name: 'Prano', role: 'Support', nationality: '🇳🇴 Norway' },
      { id: 'p24', name: 'Mango', role: 'Flex', nationality: '🇩🇰 Denmark' },
      { id: 'p25', name: 'Yuzus', role: 'Anchor', nationality: '🇫🇮 Finland' },
    ],
  },
  {
    id: 'vp',
    name: 'Virtus.pro',
    short: 'VP',
    region: 'EU',
    ranking: 6,
    color: '#FBBF24',
    wins: 15,
    losses: 15,
    players: [
      { id: 'p26', name: 'Scyther', role: 'IGL', nationality: '🇷🇺 Russia' },
      { id: 'p27', name: 'Ukami', role: 'Fragger', nationality: '🇷🇺 Russia' },
      {
        id: 'p28',
        name: 'ShepparD',
        role: 'Support',
        nationality: '🇷🇺 Russia',
      },
      { id: 'p29', name: 'JoyStiCK', role: 'Flex', nationality: '🇷🇺 Russia' },
      { id: 'p30', name: 'Patsi', role: 'Anchor', nationality: '🇷🇺 Russia' },
    ],
  },
];

export const teamMap: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.id, t])
);

export const tournaments: Tournament[] = [
  {
    id: 'ewc2025',
    name: 'Esports World Cup 2025',
    status: 'live',
    startDate: 'Sep 1, 2025',
    endDate: 'Sep 20, 2025',
    region: 'Global',
    prizePool: '$3,000,000',
    teams: 16,
  },
  {
    id: 'major-eu',
    name: 'EU Major — Fall 2025',
    status: 'upcoming',
    startDate: 'Oct 5, 2025',
    endDate: 'Oct 18, 2025',
    region: 'Europe',
    prizePool: '$500,000',
    teams: 12,
  },
  {
    id: 'major-na',
    name: 'NA Major — Fall 2025',
    status: 'upcoming',
    startDate: 'Oct 12, 2025',
    endDate: 'Oct 24, 2025',
    region: 'North America',
    prizePool: '$500,000',
    teams: 10,
  },
  {
    id: 'six-invit',
    name: 'Six Invitational 2025',
    status: 'completed',
    startDate: 'Feb 10, 2025',
    endDate: 'Feb 22, 2025',
    region: 'Global',
    prizePool: '$2,000,000',
    teams: 20,
  },
  {
    id: 'br-open',
    name: 'Brazil Open 2025',
    status: 'completed',
    startDate: 'Jul 5, 2025',
    endDate: 'Jul 14, 2025',
    region: 'Brazil',
    prizePool: '$150,000',
    teams: 8,
  },
];

export const matches: Match[] = [
  {
    id: 'm1',
    teamA: teamMap['liquid'],
    teamB: teamMap['g2'],
    status: 'upcoming',
    date: 'Today',
    time: '18:00 CEST',
    tournament: 'Esports World Cup 2025',
    tournamentId: 'ewc2025',
    region: 'Global',
    format: 'BO3',
    maps: ['Bank', 'Chalet', 'Coastline'],
  },
  {
    id: 'm2',
    teamA: teamMap['wolves'],
    teamB: teamMap['furia'],
    status: 'upcoming',
    date: 'Today',
    time: '20:00 CEST',
    tournament: 'Esports World Cup 2025',
    tournamentId: 'ewc2025',
    region: 'Global',
    format: 'BO3',
    maps: ['Clubhouse', 'Oregon', 'Kafe'],
  },
  {
    id: 'm3',
    teamA: teamMap['nip'],
    teamB: teamMap['vp'],
    status: 'upcoming',
    date: 'Sep 15',
    time: '16:00 CEST',
    tournament: 'EU Major — Fall 2025',
    tournamentId: 'major-eu',
    region: 'Europe',
    format: 'BO3',
    maps: ['Villa', 'Skyscraper', 'Theme Park'],
  },
  {
    id: 'm4',
    teamA: teamMap['g2'],
    teamB: teamMap['furia'],
    status: 'live',
    date: 'Today',
    time: '15:30 CEST',
    tournament: 'Esports World Cup 2025',
    tournamentId: 'ewc2025',
    region: 'Global',
    format: 'BO5',
    scoreA: 2,
    scoreB: 1,
    maps: ['Bank', 'Chalet', 'Coastline', 'Oregon'],
  },
  {
    id: 'm5',
    teamA: teamMap['liquid'],
    teamB: teamMap['furia'],
    scoreA: 2,
    scoreB: 1,
    status: 'completed',
    date: 'Sep 12',
    time: '18:00 CEST',
    tournament: 'Esports World Cup 2025',
    tournamentId: 'ewc2025',
    region: 'Global',
    format: 'BO3',
    maps: ['Bank', 'Chalet', 'Coastline'],
  },
  {
    id: 'm6',
    teamA: teamMap['wolves'],
    teamB: teamMap['nip'],
    scoreA: 0,
    scoreB: 2,
    status: 'completed',
    date: 'Sep 12',
    time: '16:00 CEST',
    tournament: 'Esports World Cup 2025',
    tournamentId: 'ewc2025',
    region: 'Global',
    format: 'BO3',
    maps: ['Clubhouse', 'Oregon'],
  },
  {
    id: 'm7',
    teamA: teamMap['vp'],
    teamB: teamMap['g2'],
    scoreA: 1,
    scoreB: 2,
    status: 'completed',
    date: 'Sep 11',
    time: '20:00 CEST',
    tournament: 'Esports World Cup 2025',
    tournamentId: 'ewc2025',
    region: 'Global',
    format: 'BO3',
    maps: ['Kafe', 'Oregon', 'Bank'],
  },
];

export const standings: Standing[] = [
  {
    rank: 1,
    team: teamMap['liquid'],
    played: 34,
    wins: 28,
    losses: 6,
    rounds: '86–42',
    points: 84,
  },
  {
    rank: 2,
    team: teamMap['g2'],
    played: 33,
    wins: 24,
    losses: 9,
    rounds: '74–51',
    points: 72,
  },
  {
    rank: 3,
    team: teamMap['furia'],
    played: 31,
    wins: 21,
    losses: 10,
    rounds: '65–48',
    points: 63,
  },
  {
    rank: 4,
    team: teamMap['wolves'],
    played: 31,
    wins: 18,
    losses: 13,
    rounds: '58–55',
    points: 54,
  },
  {
    rank: 5,
    team: teamMap['nip'],
    played: 31,
    wins: 16,
    losses: 15,
    rounds: '52–58',
    points: 48,
  },
  {
    rank: 6,
    team: teamMap['vp'],
    played: 30,
    wins: 15,
    losses: 15,
    rounds: '50–60',
    points: 45,
  },
];
