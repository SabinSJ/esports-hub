'use client';

import type { Match } from '@/types/Match';

import { useRouter } from 'next/navigation';
import MatchCard from '@/components/MatchCard';
import styles from './ResultsSection.module.css';

interface Props {
  matches: Match[];
}

const ResultsSection = ({ matches }: Props) => {
  const router = useRouter();

  const navigateToMatchId = (id: number) => {
    router.push(`/match/${id}`);
  };

  return (
    <>
      <div className={styles.header}>
        <span className={styles.count}>
          {matches.length} {matches.length === 1 ? 'match' : 'matches'}
        </span>
      </div>

      {matches.length === 0 ? (
        <div className={styles.emptyBox}>
          <div className={styles.emptyTitle}>No matches found</div>
          <div className={styles.emptySubtitle}>Try adjusting your filters</div>
        </div>
      ) : (
        <div className={styles.grid}>
          {matches.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              onSelect={(id) => navigateToMatchId(id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ResultsSection;
