'use client';

import { useState } from 'react';

import HeroSection from '@/components/HeroSection';
import FiltersSection from '@/components/FilterSection/FilterSection';
import ResultsSection from '@/components/match/ResultsSection';
import TabsSection from '@/components/match/TabsSection';

import { standings, tournaments } from '@/data/mock';

import { matches, Tab } from '@/data/mock';
import { texts } from '@/constants/texts';

const Matches = () => {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [search, setSearch] = useState('');
  const [tournamentFilter, setTournamentFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const regions = Array.from(new Set(standings.map((s) => s.team.region)));
  const filtered = matches.filter((m) => {
    const matchesTab =
      tab === 'upcoming' ? m.status !== 'completed' : m.status === 'completed';

    const matchesSearch =
      search === '' ||
      m.teamA.name.toLowerCase().includes(search.toLowerCase()) ||
      m.teamB.name.toLowerCase().includes(search.toLowerCase());

    const matchesTournament =
      tournamentFilter === 'all' || m.tournamentId === tournamentFilter;

    const matchesRegion = regionFilter === 'all' || m.region === regionFilter;

    return matchesTab && matchesSearch && matchesTournament && matchesRegion;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.matches.title}
        description={texts.matches.description}
      />

      <TabsSection tab={tab} onTabChange={setTab} />

      <FiltersSection
        searchInput={{ value: search, onChange: setSearch }}
        tournamentFilter={{
          value: tournamentFilter,
          onChange: setTournamentFilter,
          tournaments: tournaments,
        }}
        regionFilter={{
          value: regionFilter,
          onChange: setRegionFilter,
          regions: regions,
        }}
      />

      <ResultsSection matches={filtered} />
    </div>
  );
};

export default Matches;
