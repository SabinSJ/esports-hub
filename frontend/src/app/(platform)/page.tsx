import { Metadata } from 'next';
import { texts } from '@/constants/texts';

import { getMatches } from '@/lib/api/matches';
import { getStandings } from '@/lib/api/teams';

import HeroSection from '@/components/HeroSection';
import FeaturedUpcoming from '@/components/home/FeaturedUpcoming';
import LiveMatchBanner from '@/components/home/LiveMatchBanner';
import StandingsSection from '@/components/home/StandingsSection';
import UpcomingMatches from '@/components/home/UpcomingMatches';

export const metadata: Metadata = {
  title: 'EsportsHub | Esports Matches, Teams & Tournaments',
  description:
    'Follow esports matches, teams and tournaments. Get live scores, standings and the latest competitive gaming updates on EsportsHub.',
};

export default async function Home() {
  const matches = await getMatches();
  const standings = await getStandings();

  return (
    <>
      <HeroSection
        variant="hero"
        badge={texts.homePage.badge}
        title={texts.homePage.title}
        highlightedTitle={texts.homePage.highlightedTitle}
        description={texts.homePage.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <LiveMatchBanner matches={matches} />

        <FeaturedUpcoming matches={matches} />

        <UpcomingMatches matches={matches} />

        <StandingsSection standings={standings} />
      </div>
    </>
  );
}
