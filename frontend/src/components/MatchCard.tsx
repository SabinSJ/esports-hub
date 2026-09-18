import type { Match } from '@/types/Match';
import TeamLogo from './TeamLogo';
import StatusBadge from './shared/StatusBadge';
import styles from './MatchCard.module.css';

interface Props {
  match: Match;
  onSelect?: (id: number) => void;
  featured?: boolean;
}

export default function MatchCard({ match, onSelect, featured }: Props) {
  const isCompleted = match.status === 'Finished';
  const isLive = match.status === 'Live';

  const winnerA =
    isCompleted &&
    match.scoreA !== undefined &&
    match.scoreB !== undefined &&
    match.scoreA > match.scoreB;

  const winnerB =
    isCompleted &&
    match.scoreA !== undefined &&
    match.scoreB !== undefined &&
    match.scoreB > match.scoreA;

  return (
    <div
      onClick={() => onSelect?.(match.id)}
      className={`${styles.card} ${featured ? styles.featured : styles.normal} ${
        onSelect ? styles.clickable : ''
      }`}
    >
      {isLive && <div className={styles.liveBar} />}
      {featured && !isLive && <div className={styles.featuredBar} />}

      <div className={styles.header}>
        <span className={styles.tournament}>{match.tournamentName}</span>

        <div className={styles.headerRight}>
          <span className={styles.format}>{match.format}</span>
          <StatusBadge status={match.status} />
        </div>
      </div>

      <div
        className={`${styles.teams} ${featured ? styles.teamsFeatured : ''}`}
      >
        <div className={`${styles.teamSide} ${winnerB ? styles.dimmed : ''}`}>
          <TeamLogo logoUrl={match.teamA.logoUrl} size={featured ? 48 : 36} />

          <div className={styles.teamInfo}>
            <div
              className={`${styles.teamName} ${
                featured ? styles.teamNameFeatured : styles.teamNameNormal
              }`}
            >
              {match.teamA.name}
            </div>
            <div className={styles.region}>{match.teamA.region}</div>
          </div>
        </div>

        <div className={styles.scoreBox}>
          {isCompleted || isLive ? (
            <div className={styles.scoreRow}>
              <span
                className={`${styles.score} ${
                  winnerA
                    ? styles.scoreWin
                    : isCompleted
                      ? styles.scoreCompleted
                      : styles.scoreLive
                }`}
              >
                {match.scoreA}
              </span>

              <span className={styles.scoreDash}>—</span>

              <span
                className={`${styles.score} ${
                  winnerB
                    ? styles.scoreWin
                    : isCompleted
                      ? styles.scoreCompleted
                      : styles.scoreLive
                }`}
              >
                {match.scoreB}
              </span>
            </div>
          ) : (
            <span className={styles.vs}>VS</span>
          )}

          {isLive && <span className={styles.liveText}>live</span>}
        </div>

        <div
          className={`${styles.teamSide} ${styles.teamSideRight} ${
            winnerA ? styles.dimmed : ''
          }`}
        >
          <div className={styles.teamInfoRight}>
            <div
              className={`${styles.teamName} ${
                featured ? styles.teamNameFeatured : styles.teamNameNormal
              }`}
            >
              {match.teamB.name}
            </div>
            <div className={styles.region}>{match.teamB.region}</div>
          </div>

          <TeamLogo logoUrl={match.teamB.logoUrl} size={featured ? 48 : 36} />
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.date}>{/* {match.date} · {match.time} */}</span>

        {onSelect && <span className={styles.viewMore}>View match →</span>}
      </div>
    </div>
  );
}
