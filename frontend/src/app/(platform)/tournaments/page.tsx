'use client';

import { useState } from 'react';

import { useQuery } from '@/hooks/useQuery';
import { getTournaments } from '@/lib/api/tournaments';
import { TournamentFilter } from '@/types/Tournament';

import FilterSection from '@/components/FilterSection/FilterSection';
import HeroSection from '@/components/HeroSection';
import TournamentResultsSection from '@/components/tournaments/TournamentResultsSection';
import { texts } from '@/constants/texts';

const Tournaments = () => {
  const { data, loading, error } = useQuery(getTournaments);

  const tournaments = data || [];

  const [filter, setFilter] = useState<TournamentFilter>('All');

  const filtered =
    filter === 'All'
      ? tournaments
      : tournaments.filter((t) => t.status === filter);

  const filterTabs: { id: TournamentFilter; label: string }[] = [
    { id: 'All', label: 'All' },
    { id: 'Live', label: '● Live' },
    { id: 'Upcoming', label: 'Upcoming' },
    { id: 'Finished', label: 'Completed' },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.tournaments.title}
        description={texts.tournaments.description}
      />

      <FilterSection
        tabsFilter={{
          value: filter,
          tabs: filterTabs,
          onChange: setFilter,
        }}
      />

      <TournamentResultsSection filtered={filtered} />
    </div>
  );
};

export default Tournaments;
