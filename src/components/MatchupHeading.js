function MatchupHeading({ match, onHomeClick, onAwayClick }) {
  return (
    <div className="row justify-center items-center text-xl bg-slate-200/20 rounded-lg p-1">
      <span
        role="presentation"
        onClick={onHomeClick}
        className={`py-1 pl-1 pr-2 rounded-l-lg capitalize ${onHomeClick ? 'cursor-pointer hover:underline' : ''}`}
        style={{
          backgroundColor: match.homeTeamContainer?.team?.colours?.colour2,
          color: match.homeTeamContainer?.team?.colours?.colour1,
        }}
      >
        <span
          className="mr-1"
        >
          {match.homeTeamContainer?.team?.location}
        </span>
        <span
          className="italic mr-1"
        >
          {match.homeTeamContainer?.team?.name}
        </span>
      </span>
      <span className="mx-2 text-base">VS</span>
      <span
        role="presentation"
        onClick={onAwayClick}
        className={`py-1 pr-1 pl-2 rounded-r-lg capitalize ${onAwayClick ? 'cursor-pointer hover:underline' : ''}`}
        style={{
          backgroundColor: match.awayTeamContainer?.team?.colours?.colour2,
          color: match.awayTeamContainer?.team?.colours?.colour1,
        }}
      >
        <span className="mr-1">
          {match.awayTeamContainer?.team?.location}
        </span>
        <span
          className="italic mr-1"
        >
          {match.awayTeamContainer?.team?.name}
        </span>
      </span>
    </div>
  );
}

export default MatchupHeading;
