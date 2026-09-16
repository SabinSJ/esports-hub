import { useRouter } from 'next/navigation';

import { matches } from '@/data/mock';

import SectionHeader from '@/components/shared/SectionHeader';
import MatchCard from '@/components/MatchCard';

import styles from './UpcomingMatches.module.css';

const UpcomingMatches = () => {
  const router = useRouter();
  const upcoming = matches.filter((m) => m.status === 'upcoming');

  const navigateTo = (path: string, id?: string) => {
    router.push(`/${path}/${id ? id : ''}`);
  };

  return (
    <div className={styles.wrapper}>
      <SectionHeader
        title="Upcoming Matches"
        action={{ label: 'View all', onClick: () => navigateTo('match') }}
      />

      <div className={styles.grid}>
        {upcoming.slice(0, 4).map((m) => (
          <MatchCard
            key={m.id}
            match={m}
            onSelect={(id) => navigateTo('match', id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMatches;
