'use client';

const liveMatch = {
  tournament: 'Esports World Cup',
  map: 'Bank',
  round: 11,
  teamA: { name: 'Team Liquid', initials: 'TL', score: 7, color: '#3b5bff' },
  teamB: { name: 'G2 Esports', initials: 'G2', score: 4, color: '#c9cdd4' },
};

const upNext = { teamA: 'FURIA', teamB: 'Wolves Esports', time: '18:00' };

type Team = (typeof liveMatch)['teamA'];

function LiveDot() {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
    </span>
  );
}

function TeamRow({ team, emphasized = false }: { team: Team; emphasized?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border font-mono text-xs font-semibold"
          style={{
            backgroundColor: `${team.color}26`,
            borderColor: `${team.color}40`,
            color: team.color,
          }}
        >
          {team.initials}
        </span>
        <span className={`truncate text-sm font-medium ${emphasized ? 'text-ink' : 'text-ink-muted'}`}>
          {team.name}
        </span>
      </div>
      <span className={`shrink-0 px-2 text-lg font-semibold ${emphasized ? 'text-ink' : 'text-ink-muted'}`}>
        {team.score}
      </span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="font-mono text-[11px] tracking-wide text-ink-faint">{label}</p>
    </div>
  );
}

export default function AuthLeft() {
  return (
    <section className="relative flex flex-col justify-between overflow-hidden border-b border-line px-6 py-12 lg:border-b-0 lg:border-r lg:px-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 auth-grid-fade" />

      <div className="relative">
        <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] sm:text-6xl">
          <span className="block text-ink">Compete.</span>
          <span className="block text-accent">Follow.</span>
          <span className="block text-ink">Win.</span>
        </h1>

        <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
          Track your favorite teams, follow live scores, and stay on top of
          every tournament — all in one place.
        </p>
      </div>

      {/* LIVE NOW */}
      <div className="relative mt-10 max-w-md">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs tracking-wide text-ink-faint">
          <LiveDot />
          <span className="text-ink-muted">LIVE NOW</span>
          <span>·</span>
          <span>{liveMatch.tournament}</span>
        </div>

        <div className="rounded-md border border-line-strong bg-panel2/80 p-4 backdrop-blur-sm">
          <TeamRow team={liveMatch.teamA} emphasized />
          <div className="mt-2.5">
            <TeamRow team={liveMatch.teamB} />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-ink-faint">
            <span>MAP 3 · {liveMatch.map.toUpperCase()}</span>
            <span className="text-ink-muted">Round {liveMatch.round}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-md border border-line px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-ink-muted">
            <span className="font-mono text-ink-faint">UP NEXT</span>
            <span className="text-ink">
              {upNext.teamA} <span className="text-ink-faint">vs</span>{' '}
              {upNext.teamB}
            </span>
          </div>
          <span className="font-mono text-ink-faint">{upNext.time}</span>
        </div>
      </div>

      <div className="relative mt-10 flex items-center gap-8 sm:gap-12">
        <Stat value="120+" label="PRO TEAMS" />
        <Stat value="48" label="TOURNAMENTS" />
        <Stat value="2.4M" label="MATCHES TRACKED" />
      </div>
    </section>
  );
}
