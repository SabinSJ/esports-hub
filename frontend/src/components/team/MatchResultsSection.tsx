import MatchCard from '../MatchCard';

import styles from './RecentResultsSection.module.css';
import type { Match } from '@/types/Match';

interface Props {
  title: string;
  matches: Match[];
}

const MatchResultsSection = ({ title, matches }: Props) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.titleAccent} />
        {title}
      </h2>

      <div className={styles.list}>
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
};

export default MatchResultsSection;
