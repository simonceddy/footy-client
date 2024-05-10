import { renderTeamName } from '../helpers';
import PlayerName from './PlayerName';

function PlayerCard({ player }) {
  const attributes = player.attributes?.attributes
    ? Object.values(player.attributes.attributes)
    : null;
  // console.log(attributes);
  return (
    <div className="col justify-center items-center z-40 p-2 bg-cyan-700 rounded-lg w-fit h-fit">
      <div className="col justify-between items-center p-2 bg-slate-200 dark:bg-slate-900 text-blue-900 dark:text-blue-200 border-2 border-blue-500 rounded-lg">
        {player.number && (
          <span
            style={{
              borderColor: player.team?.colours?.colour3 || player.team?.colours?.colour1 || 'blue',
              backgroundColor: player.team?.colours?.colour2 || 'white',
              color: player.team?.colours?.colour1 || 'blue',
            }}
            className="text-xl font-bold font-sans p-2 m-2 border-4 rounded-sm"
          >
            {player.number}
          </span>
        )}
        <PlayerName className="text-lg" asColumn showNickname player={player} />
        <span
          className="text-red-700 dark:text-red-300 m-1 italic capitalize"
        >
          {renderTeamName(player.team)}
        </span>
        {player.height && (
          <span className="m-2 italic">
            {Math.round(player.height)}cm
          </span>
        )}
        <div className="min-w-60 col justify-start items-center">
          {attributes.map(({ key, value }) => (
            <div
              className="row justify-between odd:bg-green-300/30 even:bg-blue-400/30 hover:underline items-center w-full"
              key={`player-attribute-${key}`}
            >
              <span className="bg-slate-400/30 py-0.5 px-2 capitalize text-left flex-1">{key}</span>
              <span className="flex-1 py-0.5 px-2 text-right">
                {value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
