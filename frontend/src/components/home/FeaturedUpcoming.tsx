'use client';

import { useRouter } from 'next/navigation';

import { Match } from '@/types/Match';
import { formatDate, formatTime } from '@/utils/formatDate';

import StatusBadge from '../shared/StatusBadge';
import SectionHeader from '../shared/SectionHeader';
import TeamLogo from '../TeamLogo';

interface Props {
  matches: Match[];
}

const FeaturedUpcoming = ({ matches }: Props) => {
  const router = useRouter();

  const featured = matches[0];

  const navigateTo = (type: string, id: number) => {
    router.push(`/${type}/${id}`);
  };

  return (
    <div>
      <SectionHeader
        title="Featured Match"
        action={{
          label: 'View match',
          onClick: () => navigateTo('match', featured.id),
        }}
      />
      <div className="bg-[#0E1118] border border-[#00C2FF20] rounded-[3px] overflow-hidden">
        <div className="h-[2px] bg-[#00C2FF]" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[10px] text-[#5E6A7E] uppercase tracking-wider">
              {featured.tournamentName}
            </span>
            <span className="font-mono text-[10px] text-[#5E6A7E]">·</span>
            <span className="font-mono text-[10px] text-[#5E6A7E]">
              {featured.format}
            </span>
            <StatusBadge status={featured.status} />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
            <div className="flex flex-col items-center gap-3 flex-1">
              <TeamLogo logoUrl={featured.teamA.logoUrl} size={72} />
              <div className="font-display font-800 text-2xl text-white text-center">
                {featured.teamA.name}
              </div>
              <div className="font-mono text-[10px] text-[#5E6A7E] uppercase">
                {featured.teamA.region} · #{featured.teamA.ranking}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="font-display font-800 text-4xl text-[#2A3348] tracking-wider">
                VS
              </div>
              <div className="font-mono text-xs text-[#5E6A7E]">
                {formatDate(featured.startTime)} ·{' '}
                {formatTime(featured.startTime)}
              </div>
              <button
                onClick={() => navigateTo('match', featured.id)}
                className="mt-2 font-display font-700 text-sm text-[#07090D] bg-[#00C2FF] hover:bg-[#00AADD] px-6 py-2 rounded-[2px] transition-colors tracking-wide"
              >
                View Match
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 flex-1">
              <TeamLogo logoUrl={featured.teamB.logoUrl} size={72} />
              <div className="font-display font-800 text-2xl text-white text-center">
                {featured.teamB.name}
              </div>
              <div className="font-mono text-[10px] text-[#5E6A7E] uppercase">
                {featured.teamB.region} · #{featured.teamB.ranking}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedUpcoming;
