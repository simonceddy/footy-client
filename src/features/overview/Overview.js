import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setAwayTeamShown, setHomeTeamShown, toggleShowTeam } from './overviewSlice';
import PlayingList from '../../components/PlayingList';
import PlayingFieldSVG from '../../components/PlayingFieldSVG';
import Modal from '../../components/Modal';
import PlayerCard from '../../components/PlayerCard';
import MatchupHeading from '../../components/MatchupHeading';

function Overview({ match = {}, children }) {
  const { showAwayTeam } = useSelector((s) => s.overview);
  const [showPlayerCard, setShowPlayerCard] = useState(null);
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full col justify-start items-center">
      {showPlayerCard && (
        <Modal onClose={() => setShowPlayerCard(null)}>
          <PlayerCard player={showPlayerCard} />
        </Modal>
      )}
      <MatchupHeading
        match={match}
        onAwayClick={showAwayTeam ? null : () => dispatch(setAwayTeamShown())}
        onHomeClick={!showAwayTeam ? null : () => dispatch(setHomeTeamShown())}
      />
      <div className="row justify-center items-center">
        {children}
      </div>
      <div className="row justify-between w-full flex-1">
        <div
          id="team-playing-list"
          className="p-4"
          style={{
            width: '20%',
            height: '100%'
          }}
        >
          <button
            id="playing-list-team-button"
            type="button"
            onClick={() => dispatch(toggleShowTeam())}
          >
            {showAwayTeam ? 'Away' : 'Home'}
          </button>
          <div id="home-team-playing-list" className="playing-list col justify-start items-start w-full">
            <PlayingList
              onPlayerNameClick={(player) => setShowPlayerCard(player)}
              players={showAwayTeam
                ? match.awayTeamContainer?.playingList?.players
                : match.homeTeamContainer?.playingList?.players}
            />
          </div>
        </div>
        <div className="h-full w-4/5">
          <PlayingFieldSVG playingField={match.playingField} mult={4} />
        </div>
      </div>
    </div>
  );
}

export default Overview;
