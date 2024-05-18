/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { renderTeamName } from '../helpers';
import PlayerName from './PlayerName';
import TeamStatlines from './TeamStatlines';
import TabButton from './TabButton';

const tabs = {
  ATTRIBUTES: 'ATTRIBUTES',
  STATS: 'STATS',
  METADATA: 'METADATA',
};

function PlayerCard({ player }) {
  const { playerStats } = useSelector((s) => s.league);
  const attributes = player.attributes?.attributes
    ? Object.keys(player.attributes.attributes)
    : null;
  const statline = playerStats[player.id] || null;
  const [currentTab, setCurrentTab] = useState(tabs.ATTRIBUTES);
  console.log(statline);
  return (
    <div className="col justify-center items-center z-40 p-2 bg-cyan-700 rounded-lg w-fit h-fit">
      <div className="col justify-between items-center p-2 bg-slate-200 dark:bg-slate-900 text-blue-900 dark:text-blue-200 border-2 border-blue-500 rounded-lg">
        {player.number && (
          <span
            style={{
              borderColor: player.team?.colours?.colour3 || player.team?.colours?.colour1 || 'blue',
              backgroundColor: player.team?.colours?.colour2 || 'white',
              color: player.team?.colours?.colour1 || 'blue',
            }}
            className="text-xl font-bold font-sans p-2 m-2 border-4 rounded-sm"
          >
            {player.number}
          </span>
        )}
        <PlayerName className="text-lg" asColumn showNickname player={player} />
        <span
          className="text-red-700 dark:text-red-300 m-1 italic capitalize"
        >
          {renderTeamName(player.team)}
        </span>
        {player.height && (
          <span className="m-2 italic">
            {Math.round(player.height)}cm
          </span>
        )}
        {player.positions && (
          <span className="m-2 font-mono">
            {player.positions.map((pos) => (
              <span key={`player-${player.id}-pos-${pos}`}>{pos}</span>
            ))}
          </span>
        )}
        <div className="col justify-start items-center w-full ">
          <div className="w-full row justify-start items-center">
            <TabButton
              onClick={() => setCurrentTab(tabs.ATTRIBUTES)}
              selected={currentTab === tabs.ATTRIBUTES}
            >
              Attributes
            </TabButton>
            <TabButton
              onClick={() => setCurrentTab(tabs.STATS)}
              selected={currentTab === tabs.STATS}
            >
              Stats
            </TabButton>
            <TabButton
              onClick={() => setCurrentTab(tabs.METADATA)}
              selected={currentTab === tabs.METADATA}
            >
              Metadata
            </TabButton>
          </div>
          {currentTab === tabs.STATS && (
            <TeamStatlines statlines={statline ? [statline] : []} includeGamesPlayed />
          )}
          {currentTab === tabs.METADATA && (
            <div>
              <span>ID:</span>
              <span>{player.id}</span>
            </div>
          )}
          {currentTab === tabs.ATTRIBUTES && (
            <div className="min-w-60 col justify-start items-center">
              {attributes.map((key) => (
                <div
                  className="row justify-between odd:bg-green-300/30 even:bg-blue-400/30 hover:underline items-center w-full text-[15px]"
                  key={`player-attribute-${key}`}
                >
                  <span className="bg-slate-400/30 py-0.5 px-2 capitalize text-left flex-1">{key}</span>
                  <span className="flex-1 py-0.5 px-2 text-right">
                    {player.attributes.attributes[key].toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
