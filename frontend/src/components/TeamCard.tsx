import { Team } from '@/data/mock';

import { calculateWinRate } from '@/utils/CalculateWinRate';

import TeamLogo from './TeamLogo';

interface Props {
  team: Team;
  onSelect?: (id: string) => void;
}

const TeamCard = ({ team, onSelect }: Props) => {
  const winRate = calculateWinRate(team.wins, team.losses);

  return (
    <div
      onClick={() => onSelect?.(team.id)}
      className="group bg-[#0E1118] border border-[#1C2232] hover:border-[#2A3348] rounded-[3px] p-5 cursor-pointer transition-all duration-200 hover:bg-[#111520]"
    >
      <div className="flex items-start gap-4 mb-4">
        <TeamLogo team={team} size={52} />
        <div className="flex-1 min-w-0">
          <div className="font-display font-700 text-lg text-white leading-none truncate">
            {team.name}
          </div>
          <div className="font-mono text-[10px] text-[#5E6A7E] mt-1 uppercase tracking-wider">
            {team.region}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="font-mono text-[10px] text-[#5E6A7E] uppercase tracking-wider">
            Rank
          </div>
          <div
            className="font-display font-800 text-2xl leading-none"
            style={{ color: team.color }}
          >
            #{team.ranking}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-[#111520] rounded-[2px] p-2 text-center">
          <div className="font-mono text-[10px] text-[#5E6A7E] mb-0.5">W</div>
          <div className="font-display font-700 text-[#22C55E] text-base">
            {team.wins}
          </div>
        </div>
        <div className="bg-[#111520] rounded-[2px] p-2 text-center">
          <div className="font-mono text-[10px] text-[#5E6A7E] mb-0.5">L</div>
          <div className="font-display font-700 text-[#EF4444] text-base">
            {team.losses}
          </div>
        </div>
        <div className="bg-[#111520] rounded-[2px] p-2 text-center">
          <div className="font-mono text-[10px] text-[#5E6A7E] mb-0.5">WR</div>
          <div className="font-display font-700 text-[#00C2FF] text-base">
            {winRate}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-1">
          {team.players.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="w-6 h-6 rounded-full bg-[#1C2232] border border-[#0E1118] flex items-center justify-center"
            >
              <span className="font-mono text-[7px] text-[#5E6A7E]">
                {p.name[0]}
              </span>
            </div>
          ))}
        </div>
        <span className="font-mono text-[10px] text-[#00C2FF] opacity-0 group-hover:opacity-100 transition-opacity">
          View team →
        </span>
      </div>
    </div>
  );
};

export default TeamCard;
