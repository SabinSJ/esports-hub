import { getTeams } from '@/lib/api/teams';

import { texts } from '@/constants/texts';

import HeroSection from '@/components/HeroSection';
import TeamsView from '@/components/team/TeamsView';

const Teams = async () => {
  const teams = await getTeams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <HeroSection
        title={texts.teams.title}
        description={texts.teams.description}
        teamsNumber={teams.length}
      />

      <TeamsView teams={teams} />
    </div>
  );
};

export default Teams;
