import type { Tab } from '@/types/Common';

import styles from './TabsSection.module.css';

interface Props {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TabsSection = ({ tab, onTabChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      {(['upcoming', 'results'] as Tab[]).map((t) => (
        <button
          key={t}
          onClick={() => onTabChange(t)}
          className={`${styles.tab} ${
            tab === t ? styles.active : styles.inactive
          }`}
        >
          {t === 'upcoming' ? 'Upcoming & Live' : 'Results'}
        </button>
      ))}
    </div>
  );
};

export default TabsSection;
