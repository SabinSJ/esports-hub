import { Team } from '@/data/mock';

import styles from './TeamRosterSection.module.css';

interface Props {
  team: Team;
}

const TeamRosterSection = ({ team }: Props) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.titleAccent} />
        Roster
      </h2>

      <div className={`${styles.grid} ${styles.gridSm}`}>
        {team.players.map((player) => (
          <div key={player.id} className={styles.playerCard}>
            <div className={styles.avatar}>
              <span
                className={styles.avatarLetter}
                style={{ color: team.color }}
              >
                {player.name[0]}
              </span>
            </div>

            <div>
              <div className={styles.playerName}>{player.name}</div>
              <div className={styles.playerMeta}>
                {player.role} · {player.nationality}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamRosterSection;
