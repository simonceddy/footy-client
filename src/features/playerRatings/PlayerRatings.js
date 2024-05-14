import { useMemo } from 'react';
import PlayerName from '../../components/PlayerName';
import { renderTeamName } from '../../helpers';

function PlayerRatings({
  players = [],
  maxPlayersListed = 0,
  rankBy = 'overall',
  onPlayerClick,
  showTeam = false,
}) {
  const sortedPlayers = useMemo(() => {
    const sorted = [...players].sort((a, b) => {
      if (a.attributes?.attributes?.[rankBy]?.value === b.attributes?.attributes?.[rankBy]?.value) {
        return 0;
      }
      return a.attributes?.attributes?.[rankBy]?.value > b.attributes?.attributes?.[rankBy]?.value
        ? 1
        : -1;
    }).reverse();
    return maxPlayersListed > 0
      ? sorted.slice(0, sorted.length > maxPlayersListed ? maxPlayersListed : sorted.length)
      : sorted;
  }, [players, maxPlayersListed, rankBy]);

  return (
    <div className="col justify-start items-center w-full p-2 rounded-lg border-2 border-blue-500 h-full dark:bg-blue-800 dark:text-red-200 bg-red-100/20 overflow-y-scroll whitespace-nowrap">
      {sortedPlayers.map((player, id) => (
        <span
          role="presentation"
          onClick={onPlayerClick ? () => onPlayerClick(player) : null}
          key={`player-${player.id || id}-ratings-row`}
          className={`row w-full justify-between items-center even:bg-blue-300/20 odd:bg-green-300/20 hover:bg-yellow-300/20 hover:underline ${onPlayerClick ? 'cursor-pointer' : ''}`}
        >
          <span className="row w-4/5 justify-start items-center">
            <span className={`${showTeam ? 'w-1/2' : 'w-full'}`}>
              <PlayerName player={player} showNumber />
            </span>
            {showTeam && player.team && (
              <span className="capitalize italic">
                - {renderTeamName(player.team)}
              </span>
            )}
          </span>
          <span>
            {player.attributes?.attributes?.[rankBy]?.value?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>
        </span>
      ))}
    </div>
  );
}

export default PlayerRatings;
