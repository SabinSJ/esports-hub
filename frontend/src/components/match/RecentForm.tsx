import { Match } from '@/data/mock';

import TeamLogo from '../TeamLogo';

import styles from './RecentForm.module.css';

interface Props {
  match: Match;
}

const RecentForm = ({ match }: Props) => {
  if (!match.maps || match.maps.length === 0) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.titleAccent} />
        Recent Form
      </h3>

      <div className={styles.list}>
        {[match.teamA, match.teamB].map((team) => (
          <div key={team.id} className={styles.teamRow}>
            <div className={styles.teamInfo}>
              <TeamLogo team={team} size={24} />
              <span className={styles.teamName}>{team.name}</span>
            </div>

            <div className={styles.results}>
              {['W', 'W', 'L', 'W', 'W'].map((r, i) => (
                <span
                  key={i}
                  className={`${styles.resultBox} ${
                    r === 'W' ? styles.resultWin : styles.resultLoss
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentForm;
