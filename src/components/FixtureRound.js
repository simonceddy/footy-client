import { renderTeamName } from '../helpers';

function FixtureRound({
  matches = [], onMatchClick, results = {},
}) {
  return (
    <div className="col justify-start items-center w-[600px] h-full overflow-y-scroll bg-slate-100 dark:bg-slate-800 dark:text-teal-200 rounded-lg border-2 border-slate-500">
      <div className="row justify-between items-center w-full px-1 pt-1 pb-3">
        <span className="w-[47%]">
          Home Team
        </span>
        <span className="w-[6%]" />
        <span className="w-[47%] text-right">
          Away Team
        </span>
      </div>
      {matches.map((match, id) => {
        const result = results[match.id] || {};
        // if (result.victor) console.log(result);
        return (
          <div
            key={`round-fixture-${id}`}
            role="presentation"
            onClick={onMatchClick ? (e) => onMatchClick(e, match) : null}
            className="row justify-between items-center w-full p-1 odd:bg-blue-400/20 even:bg-green-400/20 hover:bg-yellow-300/20"
          >
            <span className={`w-[47%] ${result.victor === match.homeTeam.id ? 'font-bold' : ''}`}>
              {renderTeamName(match.homeTeam)}
            </span>
            <span className="w-[6%]">
              VS
            </span>
            <span className={`w-[47%] text-right ${result.victor === match.awayTeam.id ? 'font-bold' : ''}`}>
              {renderTeamName(match.awayTeam)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default FixtureRound;
