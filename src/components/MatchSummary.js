import { useState } from 'react';
import { renderTeamName, totalScore } from '../helpers';
import MatchStats from './MatchStats';

/* eslint-disable max-len */

function MatchSummary({
  match = {}, result = {}, simulate, close
}) {
  const [showStats, setShowStats] = useState(false);
  // console.log(result);
  return (
    <div className="bg-blue-200 dark:bg-blue-950 dark:text-pink-300 p-2 w-full h-full overflow-y-scroll whitespace-nowrap col justify-start items-center min-w-[600px]">
      <div className="mb-1 row justify-between items-center w-full">
        <button className="p-1 m-1 border rounded-lg hover:underline z-30" type="button" onClick={close}>
          Back
        </button>
        {simulate && (
          <button className="p-1 m-1 border rounded-lg hover:underline z-30" type="button" onClick={() => simulate(match)}>
            {result.score !== undefined ? 'Re-simulate' : 'Simulate'}
          </button>
        )}
        {result.score && (
          <button className="p-1 m-1 border rounded-lg hover:underline z-30" type="button" onClick={() => setShowStats(!showStats)}>
            {showStats ? 'Score' : 'Stats'}
          </button>
        )}
      </div>
      <div
        role="presentation"
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
      <div className="italic capitalize m-1">
        {match.homeTeam.homeground?.name}
      </div>
      {result.score !== undefined && (
        <div className="p-2 m-2 border-2 border-slate-500 rounded-lg w-full col justify-start items-start">
          {showStats ? (
            <MatchStats homeTeam={match.homeTeam} awayTeam={match.awayTeam} stats={result.stats} />
          ) : (
            <>
              <div className="w-full mb-1 border-b border-slate-500">
                Match result
              </div>
              <div className={`w-full mb-1 text-lg ${result.victor === match.homeTeam.id ? 'font-bold' : ''}`}>
                {renderTeamName(result.score.homeScore.team)}
              </div>
              <div className="w-full mb-1">
                {result.score.homeScore.goals}.{result.score.homeScore.behinds}.{totalScore(result.score.homeScore)}
              </div>
              <div className={`w-full mb-1 text-lg ${result.victor === match.awayTeam.id ? 'font-bold' : ''}`}>
                {renderTeamName(result.score.awayScore.team)}
              </div>
              <div className="w-full mb-1">
                {result.score.awayScore.goals}.{result.score.awayScore.behinds}.{totalScore(result.score.awayScore)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MatchSummary;
