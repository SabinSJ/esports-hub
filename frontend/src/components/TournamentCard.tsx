import type { Tournament } from '@/types/Tournament';
import { formatDate } from '@/utils/formatDate';

import styles from './TournamentCard.module.css';

const statusConfig = {
  Live: {
    label: '● Live',
    className: styles.statusLive,
  },
  Upcoming: {
    label: 'Upcoming',
    className: styles.statusUpcoming,
  },
  Finished: {
    label: 'Completed',
    className: styles.statusCompleted,
  },
};

const TournamentCard = ({ t }: { t: Tournament }) => {
  const s = statusConfig[t.status];

  return (
    <div className={styles.card}>
      {t.status === 'Live' && <div className={styles.liveBar} />}

      <div className={styles.header}>
        <h3 className={styles.title}>{t.name}</h3>

        <span className={`${styles.statusBase} ${s.className}`}>{s.label}</span>
      </div>

      <div className={styles.grid}>
        <div>
          <div className={styles.label}>Region</div>
          <div className={styles.valueMuted}>{t.region}</div>
        </div>

        <div>
          <div className={styles.label}>Prize Pool</div>
          <div className={styles.valueAccent}>{t.prizePool}</div>
        </div>

        <div>
          <div className={styles.label}>Dates</div>
          <div className={styles.valueMuted}>
            {formatDate(t.startDate)} – {formatDate(t.endDate)}
          </div>
        </div>

        <div>
          <div className={styles.label}>Teams</div>
          <div className={styles.valueMuted}>{t.teamCount} teams</div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
