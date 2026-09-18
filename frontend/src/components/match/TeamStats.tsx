import type { Match } from '@/types/Match';

import styles from './TeamStats.module.css';

interface Props {
  match: Match;
}

const TeamStats = ({ match }: Props) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.titleAccent} />
        Team Stats
      </h3>

      {[match.teamA, match.teamB].map((team) => {
        return (
          <div key={team.id} className={styles.statItem}>
            <div className={styles.statHeader}>
              <span className={styles.winRate}>{team.winRate}% WR</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${team.winRate}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStats;
