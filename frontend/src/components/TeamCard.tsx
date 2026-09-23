import Link from 'next/link';

import type { Team } from '@/types/Team';
import TeamLogo from './TeamLogo';

import styles from './TeamCard.module.css';

interface Props {
  team: Team;
}

const TeamCard = ({ team }: Props) => {
  return (
    <Link href={`/team/${team.id}`} className={styles.card}>
      <div className={styles.header}>
        <TeamLogo logoUrl={team.logoUrl} size={52} />

        <div className={styles.teamInfo}>
          <div className={styles.teamName}>{team.name}</div>
          <div className={styles.teamRegion}>{team.region}</div>
        </div>

        <div className={styles.rankBox}>
          <div className={styles.rankLabel}>Rank</div>
          <div className={styles.rankValue}>#{team.ranking}</div>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <div className={styles.statLabel}>W</div>
          <div className={styles.statValueWins}>{team.wins}</div>
        </div>

        <div className={styles.statBox}>
          <div className={styles.statLabel}>L</div>
          <div className={styles.statValueLosses}>{team.losses}</div>
        </div>

        <div className={styles.statBox}>
          <div className={styles.statLabel}>WR</div>
          <div className={styles.statValueWR}>{team.winRate}%</div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.players}>
          {team.players.slice(0, 5).map((p) => (
            <div key={p.id} className={styles.playerBubble}>
              <span className={styles.playerLetter}>{p.name[0]}</span>
            </div>
          ))}
        </div>

        <span className={styles.viewMore}>View team</span>
      </div>
    </Link>
  );
};

export default TeamCard;
