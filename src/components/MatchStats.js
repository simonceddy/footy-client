import TeamStatlines from './TeamStatlines';

function MatchStats({ stats = {} }) {
  const awayStats = stats.awayTeam ? Object.values(stats.awayTeam) : [];
  const homeStats = stats.homeTeam ? Object.values(stats.homeTeam) : [];
  console.log(awayStats, homeStats);
  return (
    <div className="col justify-start items-start">
      <TeamStatlines statlines={homeStats} />
      <TeamStatlines statlines={awayStats} />
    </div>
  );
}

export default MatchStats;
