import { useRouter } from 'next/navigation';

import type { Team } from '@/types/Team';

import TeamCard from '../TeamCard';

interface Props {
  filtered: Team[];
}

const TeamCardsSection = ({ filtered }: Props) => {
  const router = useRouter();

  const navigateToTeamPage = (id: number) => {
    router.push(`/team/${id}`);
  };

  return (
    <>
      {filtered.length === 0 ? (
        <div className="bg-[#0E1118] border border-[#1C2232] rounded-[3px] py-16 text-center">
          <div className="font-display font-600 text-[#2A3348] text-xl mb-2">
            No teams found
          </div>
          <div className="font-mono text-[11px] text-[#5E6A7E]">
            Try adjusting your search
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TeamCard
              key={t.id}
              team={t}
              onSelect={(id) => navigateToTeamPage(id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TeamCardsSection;
