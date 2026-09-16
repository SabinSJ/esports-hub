import { Match } from '@/data/mock';

import styles from './MatchInfoCard.module.css';

interface Props {
  match: Match;
}

export default function MatchInfoCard({ match }: Props) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.titleAccent} />
        Match Info
      </h3>

      <div className={styles.list}>
        {[
          { label: 'Tournament', value: match.tournament },
          { label: 'Format', value: match.format },
          { label: 'Region', value: match.region },
          { label: 'Date', value: match.date },
          { label: 'Time', value: match.time },
        ].map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
