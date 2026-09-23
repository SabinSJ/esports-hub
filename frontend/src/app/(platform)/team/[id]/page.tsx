import { Metadata } from 'next';

import { getTeamById } from '@/lib/api/teams';
import { isAuthenticated } from '@/lib/auth/auth';
import { isFavoriteTeam } from '@/lib/api/users';

import NotFound from '@/components/shared/NotFound';
import HeaderSection from '@/components/HeaderSection';

import TeamRosterSection from '@/components/team/TeamRosterSection';
import MatchResultsSection from '@/components/team/MatchResultsSection';
import TeamHeaderContent from '@/components/team/TeamHeaderContent';

import styles from '@/components/team/TeamPage.module.css';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const team = await getTeamById(id);

  return {
    title: `${team.name} | EsportsHub`,
    description: `Follow ${team.name}'s results, upcoming matches, roster and ranking.`,
    openGraph: {
      title: team.name,
      description: `Follow ${team.name}'s results, upcoming matches, roster and ranking.`,
      images: [team.logoUrl],
    },
  };
};

const TeamDetails = async ({ params }: Props) => {
  const { id } = await params;

  const isUserAuthenticated = await isAuthenticated();

  const [team, isFavorited] = await Promise.all([
    getTeamById(id),
    isUserAuthenticated ? isFavoriteTeam(id) : Promise.resolve(false),
  ]);

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
        <TeamHeaderContent
          team={team}
          isfavoriteTeam={isFavorited}
          isUserAuthenticated={isUserAuthenticated}
        />
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
