function Statlines({ statlines = [] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>
            {}
          </th>
        </tr>
      </thead>
      {statlines.map((statline, id) => (
        <tr key={`statline-row-${statline.player?.id || id}`}>
          <td>{}</td>
        </tr>
      ))}
    </table>
  );
}

export default Statlines;
