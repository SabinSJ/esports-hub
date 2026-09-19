import { getStandings } from '@/lib/api/teams';

import { texts } from '@/constants/texts';

import HeroSection from '@/components/HeroSection';
import StandingsTable from '@/components/StandingsTable';

import styles from '@/components/standings/Standings.module.css';

const Standings = async () => {
  const standings = await getStandings();

  const summary = [
    { label: 'Teams', value: standings.length },
    { label: 'Leader', value: standings[0]?.teamName ?? '—' },
    { label: 'Top WR', value: standings[0]?.winRate ?? '—' },
  ];

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
        <StandingsTable standings={standings} />
      </div>
    </div>
  );
};

export default Standings;
