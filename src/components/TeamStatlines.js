import PlayerName from './PlayerName';

function TeamStatlines({ statlines = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            Player
          </th>
          <th>
            Kicks
          </th>
          <th>
            Handballs
          </th>
          <th>
            Marks
          </th>
          <th>
            Tackles
          </th>
          <th>
            Hitouts
          </th>
          <th>
            1%
          </th>
          <th>
            Goals
          </th>
          <th>
            Behinds
          </th>
        </tr>
      </thead>
      <tbody>
        {statlines.map(({ player, stats }) => (
          <tr key={`player-${player.id}-statline`}>
            <td>
              <PlayerName player={player} showNumber />
              {}
            </td>
            <td>
              {stats.kick || 0}
            </td>
            <td>
              {stats.handball || 0}
            </td>
            <td>
              {stats.mark || 0}
            </td>
            <td>
              {stats.tackle || 0}
            </td>
            <td>
              {stats.hitout || 0}
            </td>
            <td>
              {stats.spoil || 0}
            </td>
            <td>
              {stats.goal || 0}
            </td>
            <td>
              {stats.behind || 0}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamStatlines;
