import { getTournaments } from '@/lib/api/tournaments';

import HeroSection from '@/components/HeroSection';
import TournamentsView from '@/components/tournaments/TournamentsView';

import { texts } from '@/constants/texts';

const Tournaments = async () => {
  const tournaments = await getTournaments();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.tournaments.title}
        description={texts.tournaments.description}
      />

      <TournamentsView tournaments={tournaments} />
    </div>
  );
};

export default Tournaments;
