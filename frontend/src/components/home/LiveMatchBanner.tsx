import { Match } from '@/types/Match';

import SectionHeader from '../shared/SectionHeader';
import MatchCard from '../MatchCard';

interface Props {
  matches: Match[];
}

const LiveMatchBanner = ({ matches }: Props) => {
  const live = matches.find((m) => m.status === 'Live');

  return (
    <>
      {live && (
        <>
          <SectionHeader title="Live Now" label="View match" path="match" />
          <MatchCard match={live} featured />
        </>
      )}
    </>
  );
};

export default LiveMatchBanner;
