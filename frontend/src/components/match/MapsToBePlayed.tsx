import { Match } from '@/data/mock';
import styles from './MapsToBePlayed.module.css';

interface Props {
  match: Match;
  isCompleted: boolean;
}

export default function MapsToBePlayed({ match, isCompleted }: Props) {
  if (!match.maps || match.maps.length === 0) return null;

  const completedMaps = Math.max(match.scoreA ?? 0, match.scoreB ?? 0);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.titleSpan} />
        Maps
      </h3>

      <div className={`${styles.grid} ${styles.gridSm}`}>
        {match.maps.map((map, i) => {
          const isMapCompleted = isCompleted && i < completedMaps;

          return (
            <div
              key={map}
              className={`${styles.mapCard} ${
                isMapCompleted
                  ? styles.mapCardCompleted
                  : styles.mapCardUpcoming
              }`}
            >
              <div className={styles.mapName}>{map}</div>
              <div className={styles.mapIndex}>Map {i + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
