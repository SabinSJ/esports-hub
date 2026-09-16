import type { Tournament } from '@/data/mock';
import styles from './TournamentCard.module.css';

const statusConfig = {
  live: {
    label: '● Live',
    className: styles.statusLive,
  },
  upcoming: {
    label: 'Upcoming',
    className: styles.statusUpcoming,
  },
  completed: {
    label: 'Completed',
    className: styles.statusCompleted,
  },
};

const TournamentCard = ({ t }: { t: Tournament }) => {
  const s = statusConfig[t.status];

  return (
    <div className={styles.card}>
      {t.status === 'live' && <div className={styles.liveBar} />}

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
            {t.startDate} – {t.endDate}
          </div>
        </div>

        <div>
          <div className={styles.label}>Teams</div>
          <div className={styles.valueMuted}>{t.teams} teams</div>
        </div>
      </div>
    </div>
  );
};

export default TournamentCard;
