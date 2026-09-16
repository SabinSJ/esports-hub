import { Match } from '@/data/mock';
import TeamLogo from '@/components/TeamLogo';
import styles from './MatchDetailsSection.module.css';

interface Props {
  match: Match;
  winnerA: boolean;
  winnerB: boolean;
}

export default function MatchDetailsSection({
  match,
  winnerA,
  winnerB,
}: Props) {
  const isCompleted = match.status === 'completed';
  const isLive = match.status === 'live';

  return (
    <div className={styles.matchLayout}>
      <div className={`${styles.teamBlock} ${winnerB ? styles.dimmed : ''}`}>
        <TeamLogo team={match.teamA} size={80} />
        <div className={styles.teamName}>{match.teamA.name}</div>
        <div className={styles.teamMeta}>
          {match.teamA.region} · Rank #{match.teamA.ranking}
        </div>
      </div>

      <div className={styles.centerBlock}>
        {isCompleted || isLive ? (
          <div className={styles.scoreRow}>
            <span
              className={`${styles.scoreA} ${
                winnerA ? styles.scoreWinner : styles.scoreLoser
              }`}
            >
              {match.scoreA}
            </span>

            <span className={styles.scoreDash}>—</span>

            <span
              className={`${styles.scoreB} ${
                winnerB ? styles.scoreWinner : styles.scoreLoser
              }`}
            >
              {match.scoreB}
            </span>
          </div>
        ) : (
          <div className={styles.midContainer}>
            <div className={styles.vsText}>VS</div>
            <div className={styles.startsBox}>
              <div className={styles.startsLabel}>Starts</div>
              <div className={styles.startsDate}>{match.date}</div>
              <div className={styles.startsTime}>{match.time}</div>
            </div>
          </div>
        )}

        {isCompleted && <span className={styles.finalLabel}>Final</span>}
        {isLive && <span className={styles.liveLabel}>● Live</span>}
      </div>

      <div className={`${styles.teamBlock} ${winnerA ? styles.dimmed : ''}`}>
        <TeamLogo team={match.teamB} size={80} />
        <div className={styles.teamName}>{match.teamB.name}</div>
        <div className={styles.teamMeta}>
          {match.teamB.region} · Rank #{match.teamB.ranking}
        </div>
      </div>
    </div>
  );
}
