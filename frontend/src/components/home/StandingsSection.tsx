import { Standing } from '@/types/Team';

import SectionHeader from '@/components/shared/SectionHeader';
import StandingsTable from '@/components/StandingsTable';

import styles from './StandingsSection.module.css';

interface Props {
  standings: Standing[];
}

const StandingsSection = ({ standings }: Props) => {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title="Standings" label="Full table" path="/standings" />

      <div className={styles.tableBox}>
        <StandingsTable standings={standings} />
      </div>
    </div>
  );
};

export default StandingsSection;
