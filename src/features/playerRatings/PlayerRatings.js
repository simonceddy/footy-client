import { useMemo } from 'react';
import PlayerName from '../../components/PlayerName';

function PlayerRatings({
  players = [],
  maxPlayersListed = 0,
  rankBy = 'overall',
  onPlayerClick
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
    <div className="col justify-start items-center w-full p-2 rounded-lg border-2 border-blue-500 h-full dark:bg-blue-800 dark:text-red-200 bg-red-300 overflow-y-scroll whitespace-nowrap">
      {sortedPlayers.map((player, id) => (
        <span
          role="presentation"
          onClick={onPlayerClick ? () => onPlayerClick(player) : null}
          key={`player-${player.id || id}-ratings-row`}
          className="row w-full justify-between items-center"
        >
          <PlayerName player={player} showNickname showNumber />
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
