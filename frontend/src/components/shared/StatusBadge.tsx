import { matchStatusLabels, type MatchStatus } from '@/constants/match-status';

import styles from './StatusBadge.module.css';

type Status = MatchStatus;

const StatusBadge = ({ status }: { status: Status }) => {
  const label = matchStatusLabels[status];
  const className = styles[status];

  return <span className={`${styles.badge} ${className}`}>{label}</span>;
};

export default StatusBadge;
