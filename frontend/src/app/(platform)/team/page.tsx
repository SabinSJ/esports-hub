'use client';

import { useState } from 'react';

import { teams } from '@/data/mock';

import FilterSection from '@/components/FilterSection/FilterSection';
import TeamCardsSection from '@/components/team/TeamCardsSection';
import HeroSection from '@/components/HeroSection';
import { texts } from '@/constants/texts';

const Teams = () => {
  const [search, setSearch] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  const regions = Array.from(new Set(teams.map((t) => t.region)));

  const filtered = teams.filter((t) => {
    const matchesSearch =
      search === '' || t.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === 'all' || t.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  console.log(typeof teams.length);

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

      <TeamCardsSection filtered={filtered} />
    </div>
  );
};

export default Teams;
