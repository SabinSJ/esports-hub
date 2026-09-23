'use client';

import { useMemo, useState } from 'react';

import { Team } from '@/types/Team';

import FilterSection from '@/components/FilterSection/FilterSection';
import TeamCardsSection from '@/components/team/TeamCardsSection';

interface Props {
  teams: Team[];
}

const TeamsView = ({ teams }: Props) => {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const regions = useMemo(
    () => Array.from(new Set(teams.map((t) => t.region))),
    [teams]
  );

  const filtered = useMemo(
    () =>
      teams.filter((t) => {
        const teamSearch =
          search === '' || t.name.toLowerCase().includes(search.toLowerCase());
        const teamRegion = regionFilter === 'all' || t.region === regionFilter;
        return teamSearch && teamRegion;
      }),
    [teams, search, regionFilter]
  );

  return (
    <>
      <FilterSection
        searchInput={{ value: search, onChange: setSearch }}
        regionFilter={{
          value: regionFilter,
          onChange: setRegionFilter,
          regions: regions,
        }}
      />
      <TeamCardsSection filtered={filtered} />
    </>
  );
};

export default TeamsView;
