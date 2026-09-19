'use client';

import { useState } from 'react';

import { Tournament, TournamentFilter } from '@/types/Tournament';

import FilterSection from '@/components/FilterSection/FilterSection';
import TournamentResultsSection from '@/components/tournaments/TournamentResultsSection';

interface Props {
  tournaments: Tournament[];
}

const TournamentsView = ({ tournaments }: Props) => {
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

  return (
    <>
      <FilterSection
        tabsFilter={{
          value: filter,
          tabs: filterTabs,
          onChange: setFilter,
        }}
      />
      <TournamentResultsSection filtered={filtered} />
    </>
  );
};

export default TournamentsView;
