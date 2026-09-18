'use client';
import { useRouter } from 'next/navigation';

import { Match } from '@/types/Match';

import SectionHeader from '../shared/SectionHeader';
import MatchCard from '../MatchCard';

interface Props {
  matches: Match[];
}

const LiveMatchBanner = ({ matches }: Props) => {
  const router = useRouter();

  const live = matches.find((m) => m.status === 'Live');

  const navigateTo = (id: number) => {
    router.push(`/match/${id}`);
  };

  return (
    <>
      {live && (
        <div>
          <SectionHeader
            title="Live Now"
            action={{
              label: 'View match',
              onClick: () => navigateTo(live.id),
            }}
          />
          <MatchCard match={live} featured onSelect={(id) => navigateTo(id)} />
        </div>
      )}
    </>
  );
};

export default LiveMatchBanner;
