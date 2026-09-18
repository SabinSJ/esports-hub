import { getTeamById } from '@/lib/api/teams';

import TeamLogo from '@/components/TeamLogo';
import NotFound from '@/components/shared/NotFound';
import HeaderSection from '@/components/HeaderSection';

import TeamRosterSection from '@/components/team/TeamRosterSection';
import MatchResultsSection from '@/components/team/MatchResultsSection';

import styles from '@/Components/team/TeamPage.module.css';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const TeamDetails = async ({ params }: Props) => {
  const { id } = await params;

  const team = await getTeamById(id);
  const teamMatches = team.matches;

  if (!team) return <NotFound value={`Team ${id}`} />;

  const recentResults = teamMatches.filter((m) => m.status === 'Finished');

  const upcomingMatches = teamMatches.filter((m) => m.status === 'Scheduled');

  const teamHeaderStats = [
    { label: 'Wins', value: team.wins, color: '#22C55E' },
    { label: 'Losses', value: team.losses, color: '#EF4444' },
    { label: 'Win Rate', value: `${team.winRate}%`, color: '#00C2FF' },
    {
      label: 'Global Rank',
      value: `#${team.ranking}`,
    },
  ];

  return (
    <>
      <HeaderSection backLabel="Back to teams" stats={teamHeaderStats}>
        <div className={styles.row}>
          <TeamLogo logoUrl={team.logoUrl} size={80} />
          <div className={styles.flex1}>
            <h1 className={`${styles.title} ${styles.titleXl}`}>{team.name}</h1>
            <div className={styles.row}>
              <span className={styles.metaText}>{team.region}</span>
              <span className={styles.metaText}>Rank #{team.ranking}</span>
            </div>
          </div>
        </div>
      </HeaderSection>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <TeamRosterSection team={team} />

            <MatchResultsSection
              title="Recent Results"
              matches={recentResults}
            />
          </div>

          <MatchResultsSection title="Upcoming" matches={upcomingMatches} />
        </div>
      </div>
    </>
  );
};

export default TeamDetails;
