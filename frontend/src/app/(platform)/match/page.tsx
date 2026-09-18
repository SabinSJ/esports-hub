'use client';

import { useState } from 'react';
import { useQuery } from '@/hooks/useQuery';
import { getMatches } from '@/lib/api/matches';

import HeroSection from '@/components/HeroSection';
import FiltersSection from '@/components/FilterSection/FilterSection';
import ResultsSection from '@/components/match/ResultsSection';
import TabsSection from '@/components/match/TabsSection';

import type { Tab } from '@/types/Common';
import { texts } from '@/constants/texts';

const Matches = () => {
  const { data, loading, error } = useQuery(getMatches);

  const matches = data || [];

  const tournamentOptions = Array.from(
    new Map(
      matches.map((match) => [
        String(match.tournamentId),
        { id: match.tournamentId, name: match.tournamentName },
      ])
    ).values()
  );

  const [tab, setTab] = useState<Tab>('upcoming');
  const [search, setSearch] = useState('');
  const [tournamentFilter, setTournamentFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const regions = Array.from(
    new Set(
      matches.flatMap((match) => [match.teamA.region, match.teamB.region])
    )
  );

  const filtered = matches.filter((m) => {
    const matchesTab =
      tab === 'upcoming' ? m.status !== 'Finished' : m.status === 'Finished';

    const matchesSearch =
      search === '' ||
      m.teamA.name.toLowerCase().includes(search.toLowerCase()) ||
      m.teamB.name.toLowerCase().includes(search.toLowerCase());

    const matchesTournament =
      tournamentFilter === 'All' || String(m.tournamentId) === tournamentFilter;

    const matchesRegion =
      regionFilter === 'all' ||
      m.teamA.region === regionFilter ||
      m.teamB.region === regionFilter;

    return matchesTab && matchesSearch && matchesTournament && matchesRegion;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          tournaments: tournamentOptions,
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
