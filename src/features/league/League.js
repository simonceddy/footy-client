/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useGetGeneratedLeagueQuery } from '../factory/factoryAPI';
import { ucfirstAll } from '../../helpers';
import Modal from '../../components/Modal';
import TeamOverview from '../../components/TeamOverview';
import TeamColours from '../../components/TeamColours';
import FixtureRound from '../../components/FixtureRound';
import PlayerRatings from '../playerRatings/PlayerRatings';

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

  const [showTeam, setShowTeam] = useState(null);
  const [showFixture, setShowFixture] = useState(null);
  const [showPlayerRatings, setShowPlayerRatings] = useState(false);

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
          <FixtureRound
            matches={showFixture}
          />
        </Modal>
      )}
      {showPlayerRatings && (
        <Modal onClose={() => setShowPlayerRatings(false)}>
          <PlayerRatings players={getAllPlayers(data.league)} />
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
