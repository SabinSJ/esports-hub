export type NotificationType =
  | 'match'
  | 'prediction'
  | 'tournament'
  | 'result'
  | 'bracket';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
}

export const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'match',
    message: 'Team Liquid vs G2 Esports starts in 15 minutes.',
    timestamp: '15 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'result',
    message: 'Your followed team won their latest match.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'prediction',
    message: 'Your prediction for Team Liquid vs G2 was correct.',
    timestamp: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'tournament',
    message: 'Six Invitational 2026 has started.',
    timestamp: '5 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'bracket',
    message: 'The tournament bracket has been updated.',
    timestamp: 'Yesterday',
    read: true,
  },
];
