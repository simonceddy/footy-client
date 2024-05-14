function Ladder({ ladder = {}, onTeamClick }) {
  const sortedLadder = Object.values(ladder)
    .map((r) => ({
      ...r,
      percentage: (r.for / r.against) * 100
    }))
    .sort((a, b) => {
      if (a.points === b.points) {
        if (a.percentage === b.percentage) return 0;
        return a.percentage > b.percentage ? -1 : 1;
      }
      return a.points > b.points ? -1 : 1;
    });

  if (sortedLadder.length === 0) {
    return <div>No matches simulated yet!</div>;
  }

  return (
    <table
      className="m-2 border-2 border-lime-600 rounded-lg"
    >
      <thead>
        <tr>
          <th className="px-1">
            Team
          </th>
          <th className="px-1">
            Points
          </th>
          <th className="px-1">
            Played
          </th>
          <th className="px-1">
            Won
          </th>
          <th className="px-1">
            Lost
          </th>
          <th className="px-1">
            Drawn
          </th>
          <th className="px-1">
            For
          </th>
          <th className="px-1">
            Against
          </th>
          <th className="px-1">
            %
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedLadder.map((teamRecord, id) => (
          <tr
            key={`team-record-${teamRecord.team.id}`}
            className={`even:bg-blue-400/20 odd:bg-green-400/20 hover:bg-yellow-400/20 hover:underline ${id === 7 ? 'border-b-2 border-slate-500' : ''}`}
          >
            <td
              className={`capitalize hover:bg-slate-400/30 ${onTeamClick ? 'cursor-pointer' : ''}`}
              onClick={onTeamClick ? () => onTeamClick(teamRecord.team) : null}
            >
              {teamRecord.team.location}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.points}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.played}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.won}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.lost}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.drawn}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.for}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.against}
            </td>
            <td className="hover:bg-slate-400/30">
              {teamRecord.percentage.toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Ladder;
