'use client';

import { useState } from 'react';

import { TournamentFilter, tournaments } from '@/data/mock';

import FilterSection from '@/components/FilterSection/FilterSection';
import HeroSection from '@/components/HeroSection';
import TournamentResultsSection from '@/components/tournaments/TournamentResultsSection';
import { texts } from '@/constants/texts';

const Tournaments = () => {
  const [filter, setFilter] = useState<TournamentFilter>('all');

  const filtered =
    filter === 'all'
      ? tournaments
      : tournaments.filter((t) => t.status === filter);

  const filterTabs: { id: TournamentFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'live', label: '● Live' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.tournaments.title}
        description={texts.tournaments.description}
      />
      {/* 
      <FilterSection
        filter={filter}
        filterTabs={filterTabs}
        onChangeFilter={setFilter}
      /> */}

      <TournamentResultsSection filtered={filtered} />
    </div>
  );
};

export default Tournaments;
