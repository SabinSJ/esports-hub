import { Match } from '@/types/Match';

import SectionHeader from '@/components/shared/SectionHeader';
import MatchCard from '@/components/MatchCard';

import styles from './UpcomingMatches.module.css';

interface Props {
  matches: Match[];
}

const UpcomingMatches = ({ matches }: Props) => {
  const upcoming = matches.filter((m) => m.status === 'Scheduled');

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Upcoming Matches" label="View all" path="/match" />

      <div className={styles.grid}>
        {upcoming.slice(0, 4).map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
