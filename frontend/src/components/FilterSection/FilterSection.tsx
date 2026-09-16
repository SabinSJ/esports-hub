import { filterConfig } from '@/constants/filters';
import { Tournament } from '@/data/mock';

import styles from './FilterSection.module.css';

interface Props {
  searchInput?: {
    value: string;
    onChange: (value: string) => void;
  };

  tournamentFilter?: {
    value: string;
    onChange: (value: string) => void;
    tournaments: Tournament[];
  };

  regionFilter?: {
    value: string;
    onChange: (value: string) => void;
    regions: string[];
  };
}

const FilterSection = ({
  searchInput,
  tournamentFilter,
  regionFilter,
}: Props) => {
  return (
    <div className={styles.container}>
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
            .getOptiobs(regionFilter.regions)
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
