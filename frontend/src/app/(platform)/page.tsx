'use client';

import HeroSection from '@/components/HeroSection';
import FeaturedUpcoming from '@/components/home/FeaturedUpcoming';
import LiveMatchBanner from '@/components/home/LiveMatchBanner';
import StandingsTable from '@/components/home/StandingsSection';
import UpcomingMatches from '@/components/home/UpcomingMatches';
import { texts } from '@/constants/texts';

export default function Home() {
  return (
    <div>
      <HeroSection
        variant="hero"
        badge={texts.homePage.badge}
        title={texts.homePage.title}
        highlightedTitle={texts.homePage.highlightedTitle}
        description={texts.homePage.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <LiveMatchBanner />

        <FeaturedUpcoming />

        <UpcomingMatches />

        <StandingsTable />
      </div>
    </div>
  );
}
