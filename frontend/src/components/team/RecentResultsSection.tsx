'use client';

import { useRouter } from 'next/navigation';

import MatchCard from '../MatchCard';

import styles from './RecentResultsSection.module.css';
import { Match } from '@/data/mock';

interface Props {
  recentResults: Match[];
}

const RecentResultsSection = ({ recentResults }: Props) => {
  const router = useRouter();

  const navigateToMatchPage = (matchId: string) => {
    router.push(`/match/${matchId}`);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.titleAccent} />
        Recent Results
      </h2>

      <div className={styles.list}>
        {recentResults.map((m) => (
          <MatchCard
            key={m.id}
            match={m}
            onSelect={(mid) => navigateToMatchPage(mid)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentResultsSection;
