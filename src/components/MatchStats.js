import { renderTeamName } from '../helpers';
import TeamStatlines from './TeamStatlines';

function MatchStats({ stats = {}, homeTeam, awayTeam }) {
  const awayStats = stats.awayTeam ? Object.values(stats.awayTeam) : [];
  const homeStats = stats.homeTeam ? Object.values(stats.homeTeam) : [];
  console.log(awayStats, homeStats);
  return (
    <div className="col justify-start items-start">
      <div className="col justify-start items-start p-1 mb-1">
        {homeTeam && <span>{renderTeamName(homeTeam)}</span>}
        <TeamStatlines statlines={homeStats} />
      </div>

      <div className="col justify-start items-start p-1 mb-1">
        {awayTeam && <span>{renderTeamName(awayTeam)}</span>}
        <TeamStatlines statlines={awayStats} />
      </div>
    </div>
  );
}

export default MatchStats;
