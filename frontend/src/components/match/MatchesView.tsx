'use client';

import { useMemo, useState } from 'react';

import { Match } from '@/types/Match';

import FilterSection from '@/components/FilterSection/FilterSection';

import ResultsSection from './ResultsSection';
import TabsSection from './TabsSection';
import { Tab } from '@/types/Common';

interface Props {
  matches: Match[];
}

const MatchesView = ({ matches }: Props) => {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [search, setSearch] = useState('');
  const [tournamentFilter, setTournamentFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const tournamentOptions = useMemo(
    () =>
      Array.from(
        new Map(
          matches.map((match) => [
            String(match.tournamentId),
            { id: match.tournamentId, name: match.tournamentName },
          ])
        ).values()
      ),
    [matches]
  );

  const regions = useMemo(
    () =>
      Array.from(
        new Set(
          matches.flatMap((match) => [match.teamA.region, match.teamB.region])
        )
      ),
    [matches]
  );

  const filtered = useMemo(
    () =>
      matches.filter((m) => {
        const matchesTab =
          tab === 'upcoming'
            ? m.status !== 'Finished'
            : m.status === 'Finished';

        const normalizedSearch = search.trim().toLowerCase();

        const matchesSearch =
          normalizedSearch === '' ||
          m.teamA.name
            .toLowerCase()
            .split(' ')
            .some((word) => word.startsWith(normalizedSearch)) ||
          m.teamB.name
            .toLowerCase()
            .split(' ')
            .some((word) => word.startsWith(normalizedSearch));

        const matchesTournament =
          tournamentFilter === 'All' ||
          String(m.tournamentId) === tournamentFilter;

        const matchesRegion =
          regionFilter === 'All' ||
          m.teamA.region === regionFilter ||
          m.teamB.region === regionFilter;

        return (
          matchesTab && matchesSearch && matchesTournament && matchesRegion
        );
      }),
    [matches, search, tab, tournamentFilter, regionFilter]
  );

  return (
    <>
      <TabsSection tab={tab} onTabChange={setTab} />

      <FilterSection
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
    </>
  );
};

export default MatchesView;
