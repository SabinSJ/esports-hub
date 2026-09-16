// import { notFound } from 'next/navigation';

import { matches, teams } from '@/data/mock';
import { calculateWinRate } from '@/utils/CalculateWinRate';

import TeamLogo from '@/components/TeamLogo';
import NotFound from '@/components/shared/NotFound';
import HeaderSection from '@/components/HeaderSection';

import TeamRosterSection from '@/components/team/TeamRosterSection';
import RecentResultsSection from '@/components/team/RecentResultsSection';
import UpcomingMatches from '@/components/team/UpcomingMatches';

import styles from '@/Components/team/TeamPage.module.css';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const TeamDetails = async ({ params }: Props) => {
  const { id } = await params;

  const team = teams.find((t) => t.id === id);

  if (!team) return <NotFound value={`Team ${id}`} />;

  //   if (!team) {
  //     notFound();
  //   }

  const winRate = calculateWinRate(team.wins, team.losses);

  const teamMatches = matches.filter(
    (m) => m.teamA.id === id || m.teamB.id === id
  );

  const recentResults = teamMatches.filter((m) => m.status === 'completed');

  const upcomingMatches = teamMatches.filter((m) => m.status === 'upcoming');

  const teamHeaderStats = [
    { label: 'Wins', value: team.wins, color: '#22C55E' },
    { label: 'Losses', value: team.losses, color: '#EF4444' },
    { label: 'Win Rate', value: `${winRate}%`, color: '#00C2FF' },
    {
      label: 'Global Rank',
      value: `#${team.ranking}`,
      color: team.color,
    },
  ];

  return (
    <>
      <HeaderSection
        topBarColor={team.color}
        backLabel="Back to teams"
        stats={teamHeaderStats}
      >
        <div className={styles.row}>
          <TeamLogo team={team} size={80} />
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

            <RecentResultsSection recentResults={recentResults} />
          </div>

          <UpcomingMatches upcomingMatches={upcomingMatches} />
        </div>
      </div>
    </>
  );
};

export default TeamDetails;
