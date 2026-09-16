import { matches, teams } from '@/data/mock';

import NotFound from '@/components/shared/NotFound';
import HeaderSection from '@/components/HeaderSection';

import MatchDetailsSection from '@/components/match/MatchDetailsSection';
import MapsToBePlayed from '@/components/match/MapsToBePlayed';
import RecentForm from '@/components/match/RecentForm';
import MatchInfoCard from '@/components/match/MatchInfoCard';
import TeamStats from '@/components/match/TeamStats';

import styles from '@/components/match/MatchPage.module.css';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const MatchDetails = async ({ params }: Props) => {
  const { id } = await params;

  const match = matches.find((m) => m.id === id);

  if (!match) return <NotFound value="Match" />;

  const isCompleted = match.status === 'completed';
  const winnerA =
    isCompleted &&
    match.scoreA !== undefined &&
    match.scoreB !== undefined &&
    match.scoreA > match.scoreB;

  const winnerB =
    isCompleted &&
    match.scoreA !== undefined &&
    match.scoreB !== undefined &&
    match.scoreB > match.scoreA;

  return (
    <>
      <HeaderSection
        backLabel="Back to matches"
        meta={[
          { type: 'text', value: match.tournament },
          { type: 'dot', value: '' },
          { type: 'text', value: match.region },
          { type: 'dot', value: '' },
          { type: 'text', value: match.format },
        ]}
      >
        <MatchDetailsSection
          match={match}
          winnerA={winnerA}
          winnerB={winnerB}
        />
      </HeaderSection>

      <div className={`${styles.pageContainer} ${styles.pageContainerSm}`}>
        <div className={`${styles.gridLayout} ${styles.gridLayoutLg}`}>
          <div className={styles.matchInfo}>
            <MapsToBePlayed match={match} isCompleted={isCompleted} />

            <RecentForm match={match} />
          </div>

          <div className={styles.stackSm}>
            <MatchInfoCard match={match} />

            <TeamStats match={match} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchDetails;
