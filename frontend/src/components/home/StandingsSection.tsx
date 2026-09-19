'use client';
import { useRouter } from 'next/navigation';

import { Standing } from '@/types/Team';

import SectionHeader from '@/components/shared/SectionHeader';
import StandingsTable from '@/components/StandingsTable';

import styles from './StandingsSection.module.css';

interface Props {
  standings: Standing[];
}

const StandingsSection = ({ standings }: Props) => {
  const router = useRouter();
  const navigateTo = (path: string, id?: number) => {
    router.push(`/${path}/${id ? id : ''}`);
  };
  return (
    <div className={styles.wrapper}>
      <SectionHeader
        title="Standings"
        action={{ label: 'Full table', onClick: () => navigateTo('standings') }}
      />

      <div className={styles.tableBox}>
        <StandingsTable standings={standings} />
      </div>
    </div>
  );
};

export default StandingsSection;
