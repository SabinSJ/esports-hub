'use client';

import { useState } from 'react';

import { addFavoriteTeam, removeFavoriteTeam } from '@/lib/api/users';

import { Team } from '@/types/Team';

import TeamLogo from '../TeamLogo';
import Button from '../shared/Button';

import styles from '@/components/team/TeamPage.module.css';

interface Props {
  team: Team;
  isfavoriteTeam: boolean;
  isUserAuthenticated: boolean;
}

const TeamHeaderContent = ({
  team,
  isfavoriteTeam,
  isUserAuthenticated,
}: Props) => {
  const [isFavorited, setIsFavorited] = useState(isfavoriteTeam);

  const handleFavorite = async () => {
    if (isFavorited) {
      await removeFavoriteTeam(team.id);
      setIsFavorited(false);
      return;
    }

    await addFavoriteTeam(team.id);
    setIsFavorited(true);
  };

  return (
    <div className={styles.row}>
      <TeamLogo logoUrl={team.logoUrl} size={80} />
      <div className={styles.flex1}>
        <h1 className={styles.title}>{team.name}</h1>
        <div className={styles.row}>
          <span className={styles.metaText}>{team.region}</span>
          <span className={`${styles.metaText} ${styles.rank}`}>
            Rank #{team.ranking}
          </span>
        </div>
      </div>
      {isUserAuthenticated && (
        <Button data={team.id} onClick={handleFavorite} active={isFavorited} />
      )}
    </div>
  );
};

export default TeamHeaderContent;
