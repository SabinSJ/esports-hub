import { Metadata } from 'next';
import { texts } from '@/constants/texts';

import { getMatches } from '@/lib/api/matches';
import { getStandings } from '@/lib/api/teams';

import HeroSection from '@/components/HeroSection';
import FeaturedUpcoming from '@/components/home/FeaturedUpcoming';
import LiveMatchBanner from '@/components/home/LiveMatchBanner';
import StandingsSection from '@/components/home/StandingsSection';
import UpcomingMatches from '@/components/home/UpcomingMatches';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'EsportsHub | Esports Matches, Teams & Tournaments',
  description:
    'Follow esports matches, teams and tournaments. Get live scores, standings and the latest competitive gaming updates on EsportsHub.',
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Home() {
  return (
    <>
      <HeroSection
        variant="hero"
        badge={texts.homePage.badge}
        title={texts.homePage.title}
        highlightedTitle={texts.homePage.highlightedTitle}
        description={texts.homePage.description}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </>
  );
}
async function HomeContent() {
  const [matches, standings] = await Promise.all([
    delay(2500).then(() => getMatches()),
    delay(2500).then(() => getStandings()),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <LiveMatchBanner matches={matches} />

      <FeaturedUpcoming matches={matches} />

      <UpcomingMatches matches={matches} />

      <StandingsSection standings={standings} />
    </div>
  );
}
