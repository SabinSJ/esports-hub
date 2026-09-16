import { Match } from '@/data/mock';

import { calculateWinRate } from '@/utils/CalculateWinRate';

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
        const winRate = calculateWinRate(team.wins, team.losses);

        return (
          <div key={team.id} className={styles.statItem}>
            <div className={styles.statHeader}>
              <span className={styles.teamShort}>{team.short}</span>
              <span className={styles.winRate}>{winRate}% WR</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${winRate}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeamStats;
