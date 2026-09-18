'use client';

import { useRouter } from 'next/navigation';

import MatchCard from '../MatchCard';

import styles from './RecentResultsSection.module.css';
import type { Match } from '@/types/Match';

interface Props {
  title: string;
  matches: Match[];
}

const MatchResultsSection = ({ title, matches }: Props) => {
  const router = useRouter();

  const navigateToMatchPage = (matchId: number) => {
    router.push(`/match/${matchId}`);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.titleAccent} />
        {title}
      </h2>

      <div className={styles.list}>
        {matches.map((m) => (
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

export default MatchResultsSection;
