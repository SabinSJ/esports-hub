'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { standings, tournaments } from '@/data/mock';
import { texts } from '@/constants/texts';

import HeroSection from '@/components/HeroSection';
import SummarySection from '@/components/standings/SummarySection';
import FilterSection from '@/components/FilterSection/FilterSection';

const Standings = () => {
  const router = useRouter();

  const [tournamentFilter, setTournamentFilter] = useState('ewc2025');
  const [regionFilter, setRegionFilter] = useState('all');

  const regions = Array.from(new Set(standings.map((s) => s.team.region)));
  const filtered =
    regionFilter === 'all'
      ? standings
      : standings.filter((s) => s.team.region === regionFilter);

  const navigateToTeamsPage = (id: string) => {
    router.push(`/team/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.standings.title}
        description={texts.standings.description}
      />

      <FilterSection
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

      <SummarySection filtered={filtered} onNav={navigateToTeamsPage} />
    </div>
  );
};

export default Standings;
