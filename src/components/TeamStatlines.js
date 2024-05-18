import PlayerName from './PlayerName';

function TeamStatlines({ statlines = [], onPlayerClick, includeGamesPlayed = false }) {
  if (statlines.length === 0) return <div>No stats yet</div>;
  return (
    <table>
      <thead>
        <tr>
          <th className="px-2">
            Player
          </th>
          {includeGamesPlayed && (
          <th className="px-2">
            Games
          </th>
          )}
          <th className="px-2">
            Kicks
          </th>
          <th className="px-2">
            Handballs
          </th>
          <th className="px-2">
            Disposals
          </th>
          <th className="px-2">
            Marks
          </th>
          <th className="px-2">
            Tackles
          </th>
          <th className="px-2">
            Hitouts
          </th>
          <th className="px-2">
            1%
          </th>
          <th className="px-2">
            Goals
          </th>
          <th className="px-2">
            Behinds
          </th>
        </tr>
      </thead>
      <tbody>
        {statlines.map(({ player, stats }) => (
          <tr
            key={`player-${player.id}-statline`}
            className="odd:bg-blue-300/20 even:bg-green-300/20 hover:bg-yellow-300/20"
          >
            <td className="hover:bg-slate-300/30">
              <PlayerName onClick={onPlayerClick} player={player} showNumber />
              {}
            </td>
            {includeGamesPlayed && (
            <td className="hover:bg-slate-300/30">
              {stats.played || 0}
            </td>
            )}
            <td className="hover:bg-slate-300/30">
              {stats.kick || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.handball || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {(stats.handball || 0) + (stats.kick || 0)}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.mark || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.tackle || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.hitout || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.spoil || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.goal || 0}
            </td>
            <td className="hover:bg-slate-300/30">
              {stats.behind || 0}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamStatlines;
