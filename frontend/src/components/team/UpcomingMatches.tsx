'use client';

import { useRouter } from 'next/navigation';

import { Match } from '@/data/mock';

import MatchCard from '../MatchCard';

import styles from './UpcomingMatches.module.css';

interface Props {
  upcomingMatches: Match[];
}

const UpcomingMatches = ({ upcomingMatches }: Props) => {
  const router = useRouter();

  const navigateToMatch = (matchId: string) => {
    router.push(`/match/${matchId}`);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.titleAccent} />
        Upcoming
      </h2>

      <div className={styles.list}>
        {upcomingMatches.map((m) => (
          <MatchCard
            key={m.id}
            match={m}
            onSelect={(mid) => navigateToMatch(mid)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
