import { filterConfig } from '@/constants/filters';
import type {
  Tournament,
  TournamentFilter,
  TournamentOption,
} from '@/types/Tournament';

import styles from './FilterSection.module.css';

interface Props {
  tabsFilter?: {
    value: TournamentFilter;
    tabs: {
      id: TournamentFilter;
      label: string;
    }[];
    onChange: (value: TournamentFilter) => void;
  };

  searchInput?: {
    value: string;
    onChange: (value: string) => void;
  };

  tournamentFilter?: {
    value: string;
    onChange: (value: string) => void;
    tournaments: TournamentOption[];
  };

  regionFilter?: {
    value: string;
    onChange: (value: string) => void;
    regions: string[];
  };
}

const FilterSection = ({
  tabsFilter,
  searchInput,
  tournamentFilter,
  regionFilter,
}: Props) => {
  return (
    <div className={styles.container}>
      {tabsFilter && (
        <div className={styles.tabs}>
          {tabsFilter.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => tabsFilter.onChange(tab.id)}
              className={`${styles.tab} ${
                tabsFilter.value === tab.id ? styles.tabActive : ''
              } ${tab.id === 'Live' ? styles.tabLive : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {searchInput && (
        <div className={styles.searchWrapper}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#5E6A7E] flex-shrink-0"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            className={styles.searchInput}
            value={searchInput.value}
            onChange={(e) => searchInput.onChange(e.target.value)}
          />
        </div>
      )}

      {tournamentFilter && (
        <select
          value={tournamentFilter.value}
          onChange={(e) => tournamentFilter.onChange(e.target.value)}
          className={styles.regionSelect}
        >
          {filterConfig.tournament
            .getOptions(tournamentFilter.tournaments)
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
        </select>
      )}

      {regionFilter && (
        <select
          value={regionFilter.value}
          onChange={(e) => regionFilter.onChange(e.target.value)}
          className={styles.regionSelect}
        >
          {filterConfig.region
            .getOptions(regionFilter.regions)
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default FilterSection;
