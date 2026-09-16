import { Standing } from '@/data/mock';

import { calculateWinRate } from '@/utils/CalculateWinRate';
import StandingsTable from '@/components/StandingsTable';

import styles from './SummarySection.module.css';

interface Props {
  filtered: Standing[];
  onNav: (page: string, id?: string) => void;
}

const SummarySection = ({ filtered, onNav }: Props) => {
  const winRate = calculateWinRate(filtered[0].wins, filtered[0].played);

  return (
    <>
      <div className={styles.summaryGrid}>
        {[
          { label: 'Teams', value: filtered.length },
          { label: 'Leader', value: filtered[0]?.team.name ?? '—' },
          { label: 'Top WR', value: filtered[0] ? `${winRate}` : '—' },
        ].map(({ label, value }) => (
          <div key={label} className={styles.summaryBox}>
            <div className={styles.summaryLabel}>{label}</div>
            <div className={styles.summaryValue}>{value}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        <StandingsTable standings={filtered} onTeamSelect={(id) => onNav(id)} />
      </div>
    </>
  );
};

export default SummarySection;
