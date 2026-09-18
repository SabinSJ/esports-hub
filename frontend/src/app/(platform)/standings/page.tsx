'use client';

import { useRouter } from 'next/navigation';

import { getStandings } from '@/lib/api/teams';
import { useQuery } from '@/hooks/useQuery';

import { texts } from '@/constants/texts';

import HeroSection from '@/components/HeroSection';
import StandingsTable from '@/components/StandingsTable';

import styles from '@/components/standings/Standings.module.css';

const Standings = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(getStandings);

  const standings = data || [];

  const navigateTo = (path: string, id: number) => {
    router.push(`/${path}/${id}`);
  };

  const summary = [
    { label: 'Teams', value: standings.length },
    { label: 'Leader', value: standings[0]?.teamName ?? '—' },
    { label: 'Top WR', value: standings[0]?.winRate ?? '—' },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.standings.title}
        description={texts.standings.description}
      />

      <div className={styles.summaryGrid}>
        {summary.map(({ label, value }) => (
          <div key={label} className={styles.summaryBox}>
            <div className={styles.summaryLabel}>{label}</div>
            <div className={styles.summaryValue}>{value}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableBox}>
        <StandingsTable
          standings={standings}
          onTeamSelect={(id) => navigateTo('team', id)}
        />
      </div>
    </div>
  );
};

export default Standings;
