import { useState } from 'react';
import { renderTeamName } from '../helpers';
import PlayingList from './PlayingList';
import TeamColours from './TeamColours';
import PlayerCard from './PlayerCard';
import PlayerRatings from '../features/playerRatings/PlayerRatings';

function TeamOverview({ team = {}, players = [] }) {
  const [showPlayerCard, setShowPlayerCard] = useState(null);
  const [showBest23, setShowBest23] = useState(false);
  // console.log(team);

  return (
    <div className={`${showPlayerCard ? 'col justify-center items-center' : 'row justify-between items-start'} w-[500px] h-full bg-slate-100 dark:bg-slate-800 dark:text-teal-200 rounded-lg border-2 border-slate-500`}>
      {showPlayerCard ? (
        <>
          <button type="button" onClick={() => setShowPlayerCard(null)}>
            Back
          </button>
          <PlayerCard player={showPlayerCard} />
        </>
      ) : (
        <>
          <div className="col h-full w-1/2">
            <div className="text-lg m-1">
              {renderTeamName(team)}
            </div>
            {team.colours && (
            <TeamColours colours={team.colours} />
            )}
            {team.homeground && (
              <span className="capitalize my-2 mx-auto">
                {team.homeground.name}
              </span>
            )}
          </div>
          <div className="col h-full w-1/2">
            <div className="row justify-start items-center w-full h-[10%]">
              <button
                type="button"
                className="m-1 p-1 rounded border-2"
                disabled={!showBest23}
                onClick={() => setShowBest23(false)}
              >
                List
              </button>
              <button
                type="button"
                className="m-1 p-1 rounded border-2"
                disabled={showBest23}
                onClick={() => setShowBest23(true)}
              >
                Best 23
              </button>
            </div>
            <div className="col h-[90%] w-full overflow-y-scroll">
              {showBest23 ? (
                <PlayerRatings players={players} maxPlayersListed={23} />
              ) : (
                <PlayingList
                  onPlayerNameClick={(player) => setShowPlayerCard(player)}
                  players={players}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TeamOverview;
