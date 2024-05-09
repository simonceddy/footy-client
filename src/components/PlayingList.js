import PlayerName from './PlayerName';

function PlayingList({ players = [], onPlayerNameClick }) {
  // console.log(players);
  return (
    <div id="team-playing-list" className="playing-list col justify-start items-start w-full">
      {players.map((player, id) => (
        <PlayerName
          showNumber
          onClick={onPlayerNameClick}
          className="text-sm odd:bg-blue-400/30 even:bg-green-300/30"
          player={player}
          key={`playing-list-player-${player.playerId || id}`}
        />
      ))}
    </div>
  );
}

export default PlayingList;
