'use client';

import { useState } from 'react';

import { useQuery } from '@/hooks/useQuery';
import { getTeams } from '@/lib/api/teams';

import { texts } from '@/constants/texts';

import FilterSection from '@/components/FilterSection/FilterSection';
import TeamCardsSection from '@/components/team/TeamCardsSection';
import HeroSection from '@/components/HeroSection';

const Teams = () => {
  const { data, loading, error } = useQuery(getTeams);

  const teams = data || [];

  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const regions = Array.from(new Set(teams.map((t) => t.region)));

  const filteredTeams = teams.filter((t) => {
    const teamSearch =
      search === '' || t.name.toLowerCase().includes(search.toLowerCase());
    const teamRegion = regionFilter === 'all' || t.region === regionFilter;
    return teamSearch && teamRegion;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.teams.title}
        description={texts.teams.description}
        teamsNumber={teams.length}
      />

      <FilterSection
        searchInput={{ value: search, onChange: setSearch }}
        regionFilter={{
          value: regionFilter,
          onChange: setRegionFilter,
          regions: regions,
        }}
      />

      <TeamCardsSection filtered={filteredTeams} />
    </div>
  );
};

export default Teams;
