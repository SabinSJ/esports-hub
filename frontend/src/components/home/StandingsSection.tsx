import { useRouter } from 'next/navigation';

import { standings } from '@/data/mock';

import SectionHeader from '@/components/shared/SectionHeader';
import StandingsTable from '@/components/StandingsTable';

import styles from './StandingsSection.module.css';

const StandingsSection = () => {
  const router = useRouter();
  const navigateTo = (path: string, id?: string) => {
    router.push(`/${path}/${id ? id : ''}`);
  };
  return (
    <div className={styles.wrapper}>
      <SectionHeader
        title="Standings"
        action={{ label: 'Full table', onClick: () => navigateTo('standings') }}
      />

      <div className={styles.tableBox}>
        <StandingsTable
          standings={standings}
          compact
          onTeamSelect={(id) => navigateTo('team', id)}
        />
      </div>
    </div>
  );
};

export default StandingsSection;
