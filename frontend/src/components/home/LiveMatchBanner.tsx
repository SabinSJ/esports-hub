import { useRouter } from 'next/navigation';

import { matches } from '@/data/mock';
import SectionHeader from '../shared/SectionHeader';
import MatchCard from '../MatchCard';

const LiveMatchBanner = () => {
  const router = useRouter();

  const live = matches.find((m) => m.status === 'live');

  const navigateTo = (id: string) => {
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
