function RoundList({ rounds = [], onRoundClick, simulateAll }) {
  return (
    <div className="w-[400px] h-full col justify-start items-start whitespace-nowrap overflow-y-scroll">
      {simulateAll && (
      <button
        className="p-1 m-1 border rounded-lg hover:underline z-30"
        type="button"
        onClick={() => simulateAll(rounds)}
      >
        Simulate All
      </button>
      )}
      {rounds.map((round, id) => (
        <button
          type="button"
          className="block w-full p-1 hover:underline odd:bg-blue-300/20 even:bg-green-300/20 hover:bg-yellow-300/20"
          key={`fixture-round-${id + 1}-button`}
          onClick={onRoundClick ? () => onRoundClick(round) : null}
        >
          Round {id + 1}
        </button>
      ))}
    </div>
  );
}

export default RoundList;
