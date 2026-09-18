import type { Tournament } from '@/types/Tournament';
import TournamentCard from '@/components/TournamentCard';
import styles from './TournamentResultsSection.module.css';

interface Props {
  filtered: Tournament[];
}

const TournamentResultsSection = ({ filtered }: Props) => {
  return (
    <>
      {filtered.length === 0 ? (
        <div className={styles.emptyBox}>
          <div className={styles.emptyText}>No tournaments found</div>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      )}
    </>
  );
};

export default TournamentResultsSection;
