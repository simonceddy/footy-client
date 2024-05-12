/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGeneratedLeagueQuery } from '../factory/factoryAPI';
import { ucfirstAll } from '../../helpers';
import Modal from '../../components/Modal';
import TeamOverview from '../../components/TeamOverview';
import TeamColours from '../../components/TeamColours';
import FixtureRound from '../../components/FixtureRound';
import PlayerRatings from '../playerRatings/PlayerRatings';
import PlayerCard from '../../components/PlayerCard';
import { setResult } from './leagueSlice';
import MatchSummary from '../../components/MatchSummary';

function getAllPlayers(league) {
  const players = [];
  Object.values(league.teamLists).forEach((list) => {
    players.push(...list.players);
  });
  return players;
}

function League() {
  const {
    data, refetch, isSuccess, isFetching
  } = useGetGeneratedLeagueQuery();

  const { results } = useSelector((s) => s.league);
  // TODO tidy up all the modal states
  const [showTeam, setShowTeam] = useState(null);
  const [showFixture, setShowFixture] = useState(null);
  const [showPlayerRatings, setShowPlayerRatings] = useState(false);
  const [showPlayerCard, setShowPlayerCard] = useState(null);
  const [showMatchSummary, setShowMatchSummary] = useState(null);
  const dispatch = useDispatch();
  const attemptSimulation = async (match) => {
    // Prepare match data
    const formdata = {
      matchId: match.id,
      homeTeamContainer: {
        team: match.homeTeam,
        playingList: data.league.teamLists[match.homeTeam.location]
      },
      awayTeamContainer: {
        team: match.awayTeam,
        playingList: data.league.teamLists[match.awayTeam.location]
      },
      playingField: match.homeTeam.homeground
    };
    // console.log(formdata);
    const res = await fetch('/api/simulation/match', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const resBody = await res.json();
    // console.log(resBody);
    dispatch(setResult({
      ...resBody,
      id: match.id
    }));
  };

  useEffect(() => {
    if (isSuccess && data && typeof data.league?.name === 'string') {
      document
        .getElementsByTagName('title')[0]
        .innerHTML = ucfirstAll(data.league.name);
    }
  }, [data]);

  if (isFetching) return <div>Fetching data...</div>;
  // console.log(data);
  return (
    <div className="w-full h-full col justify-start items-center">
      {showTeam && (
        <Modal onClose={() => setShowTeam(null)}>
          <TeamOverview
            team={data.league.teams[showTeam]}
            players={data.league.teamLists[showTeam]?.players}
          />
        </Modal>
      )}
      {showFixture && (
        <Modal onClose={() => setShowFixture(null)}>
          {showMatchSummary ? (
            <MatchSummary
              close={() => setShowMatchSummary(null)}
              match={showMatchSummary}
              result={results[showMatchSummary.id] || {}}
              simulate={attemptSimulation}
            />
          ) : (
            <FixtureRound
              results={results}
              onMatchClick={(_e, match) => {
                setShowMatchSummary(match);
              }}
              matches={showFixture}
            />
          )}
        </Modal>
      )}
      {showPlayerRatings && (
        <Modal onClose={() => {
          setShowPlayerRatings(false);
          if (showPlayerCard) setShowPlayerCard(null);
        }}
        >
          {showPlayerCard ? (
            <div className="w-full h-full relative col justify-start items-center bg-slate-300 dark:bg-slate-700 dark:text-purple-300 rounded-lg py-2 px-4">
              <div
                role="presentation"
                className="absolute top-0 left-0 w-full h-full"
                onClick={() => {
                  setShowPlayerCard(null);
                }}
              />
              <button className="p-1 m-1 border rounded-lg hover:underline z-30" type="button" onClick={() => setShowPlayerCard(null)}>
                Back
              </button>
              <PlayerCard player={showPlayerCard} />
            </div>
          )
            : (
              <PlayerRatings
                onPlayerClick={(player) => setShowPlayerCard(player)}
                players={getAllPlayers(data.league)}
              />
            )}
        </Modal>
      )}
      {isSuccess && (
        <div className="col justify-start items-center p-2 w-full h-full">
          <button
            className="p-1 absolute top-1 left-1 border-2 rounded-lg border-blue-500 hover:border-yellow-500 active:border-green-500"
            type="button"
            onClick={() => refetch()}
          >
            Regenerate
          </button>
          <div className="text-xl font-bold m-2 capitalize">{data.league.name}</div>
          <button
            type="button"
            className="text-lg font-bold m-2 capitalize"
            onClick={() => setShowPlayerRatings(true)}
          >
            Player Ratings
          </button>
          <div className="row w-full h-full justify-center items-center">
            <div className="col justify-start items-start whitespace-nowrap overflow-y-scroll h-full w-[400px]">
              {Object.values(data.league.teams).map((team, id) => (
                <button
                  type="button"
                  key={`league-team-list-${team.id || id}`}
                  className="p-1 w-full border-b border-slate-500 capitalize odd:bg-blue-300/30 even:bg-green-400/30 hover:bg-yellow-400/30 hover:underline row justify-between items-center"
                  onClick={() => setShowTeam(team.location)}
                >
                  {team.colours && <TeamColours colours={team.colours} className="w-5 h-5" />}
                  <span className="flex-1 row justify-end items-center text-right">
                    <span className="mr-1">
                      {team.location}
                    </span>
                    <span className="italic">
                      {team.name}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <div className="w-[400px] h-full col justify-start items-start whitespace-nowrap overflow-y-scroll">
              {Object.keys(data.fixture.rounds).map((round) => (
                <button
                  type="button"
                  className="block w-full p-1 hover:underline"
                  key={`fixture-round-${round}-button`}
                  onClick={() => setShowFixture(data.fixture.rounds[round])}
                >
                  Round {round}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default League;
