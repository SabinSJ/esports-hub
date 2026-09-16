import type { Team } from '../data/mock';

interface Props {
  team: Team;
  size?: number;
}

export default function TeamLogo({ team, size = 40 }: Props) {
  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: team.color + '20',
        border: `1px solid ${team.color}40`,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        className="font-display font-700 tracking-wide"
        style={{
          color: team.color,
          fontSize: size * 0.3,
          lineHeight: 1,
          letterSpacing: '0.05em',
        }}
      >
        {team.short}
      </span>
    </div>
  );
}
