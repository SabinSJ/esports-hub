import { getMatches } from '@/lib/api/matches';

import HeroSection from '@/components/HeroSection';
import MatchesView from '@/components/match/MatchesView';

import { texts } from '@/constants/texts';

const Matches = async () => {
  const matches = await getMatches();

  console.log(matches);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.matches.title}
        description={texts.matches.description}
      />

      <MatchesView matches={matches} />
    </div>
  );
};

export default Matches;
