type NotificationEntityType = 'Match' | 'Team' | 'Tournament';

type NotificationType =
  | 'MatchStarting'
  | 'MatchStarted'
  | 'MatchFinished'
  | 'TournamentStarting'
  | 'TournamentStarted'
  | 'TeamUpdate';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  readAt: string | null;
  relatedEntityType: NotificationEntityType | null;
  relatedEntityId: number | null;
}
