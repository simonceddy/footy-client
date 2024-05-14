/* eslint-disable no-unused-vars */
import {
  useCallback, useEffect, useMemo, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGeneratedLeagueQuery } from '../factory/factoryAPI';
import { serverUrl, ucfirstAll } from '../../helpers';
import Modal from '../../components/Modal';
import TeamOverview from '../../components/TeamOverview';
import TeamColours from '../../components/TeamColours';
import FixtureRound from '../../components/FixtureRound';
import PlayerRatings from '../playerRatings/PlayerRatings';
import PlayerCard from '../../components/PlayerCard';
import {
  clearState, setLadder, setResult, setTab, tabs
} from './leagueSlice';
import MatchSummary from '../../components/MatchSummary';
import { fillLadderFromRounds } from './support';
import Ladder from '../../components/Ladder';
import TabButton from '../../components/TabButton';
import RoundList from '../../components/RoundList';

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

  const [isSimulating, setIsSimulating] = useState(false);

  const { results, ladder, tab } = useSelector((s) => s.league);
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
    const res = await fetch(`${serverUrl()}/api/simulation/match`, {
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

  const simulateRound = async (matches = []) => {
    await Promise.all(matches.map(attemptSimulation));
  };

  const simulateLeague = async () => {
    const rounds = Object.values(data.fixture.rounds);
    await Promise.all(rounds.map(simulateRound));
  };

  useEffect(() => {
    if (isSuccess && data && data.fixture && !isSimulating) {
      dispatch(setLadder(fillLadderFromRounds(data.fixture.rounds, results)));
    }
  }, [isSimulating]);

  useEffect(() => {
    if (isSuccess && data) {
      if (typeof data.league?.name === 'string') {
        document
          .getElementsByTagName('title')[0]
          .innerHTML = ucfirstAll(data.league.name);
      }
      dispatch(clearState());
    }
  }, [data]);

  if (isFetching) return <div>Fetching data...</div>;
  // console.log(ladder);
  // console.log(isSimulating);
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
        <Modal onClose={() => {
          setShowFixture(null);
          if (showMatchSummary) setShowMatchSummary(null);
        }}
        >
          {showMatchSummary ? (
            <MatchSummary
              close={() => setShowMatchSummary(null)}
              match={showMatchSummary}
              result={results[showMatchSummary.id] || {}}
              simulate={async (match) => {
                setIsSimulating(true);
                await attemptSimulation(match);
                setIsSimulating(false);
              }}
            />
          ) : (
            <FixtureRound
              simulate={async () => {
                setIsSimulating(true);
                await simulateRound(showFixture);
                setIsSimulating(false);
              }}
              results={results}
              onMatchClick={(_e, match) => {
                setShowMatchSummary(match);
              }}
              matches={showFixture}
            />
          )}
        </Modal>
      )}
      {showPlayerCard && (
        <Modal onClose={() => {
          setShowPlayerCard(null);
        }}
        >
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
        </Modal>
      )}
      {isSuccess && (
        <div className="col justify-start items-center p-2 w-full h-full">
          <button
            className="p-1 absolute top-1 left-1 border-2 rounded-lg border-blue-500 hover:border-yellow-500 active:border-green-500"
            type="button"
            onClick={() => { refetch(); }}
          >
            Regenerate
          </button>
          <div className="text-xl font-bold m-2 capitalize">
            {isSimulating ? 'Running simulations...' : data.league.name}
          </div>
          <div className="row items-center justify-center w-full h-[6%]">
            <TabButton
              onClick={() => {
                dispatch(setTab(tabs.LADDER));
              }}
              selected={tab === tabs.LADDER}
            >
              Ladder
            </TabButton>
            <TabButton
              onClick={() => {
                dispatch(setTab(tabs.FIXTURE));
              }}
              selected={tab === tabs.FIXTURE}
            >
              Fixture
            </TabButton>
            <TabButton
              onClick={() => {
                dispatch(setTab(tabs.TEAMS));
              }}
              selected={tab === tabs.TEAMS}
            >
              Teams
            </TabButton>
            <TabButton
              onClick={() => {
                dispatch(setTab(tabs.PLAYERS));
              }}
              selected={tab === tabs.PLAYERS}
            >
              Player Ratings
            </TabButton>
          </div>
          <div className="row w-full h-[88%] justify-center items-start">
            {tab === tabs.TEAMS && (
            <div className="col justify-start items-start whitespace-nowrap overflow-y-scroll h-full w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2">
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
            )}
            {tab === tabs.LADDER && (
              <Ladder
                ladder={ladder}
                onTeamClick={(team) => setShowTeam(team.location)}
              />
            )}
            {tab === tabs.PLAYERS && (
              <PlayerRatings
                onPlayerClick={(player) => setShowPlayerCard(player)}
                players={getAllPlayers(data.league)}
                showTeam
              />
            )}
            {tab === tabs.FIXTURE && (
              <RoundList
                simulateAll={async () => {
                  setIsSimulating(true);
                  await simulateLeague();
                  setIsSimulating(false);
                }}
                rounds={Object.keys(data.fixture.rounds)}
                onRoundClick={(round) => setShowFixture(data.fixture.rounds[round])}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default League;
