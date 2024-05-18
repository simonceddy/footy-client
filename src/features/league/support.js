import { totalScore } from '../../helpers';

export const ladderObject = {
  points: 0,
  played: 0,
  won: 0,
  lost: 0,
  drawn: 0,
  for: 0,
  against: 0
};

export function fillLadderFromRounds(rounds = {}, results = {}) {
  const ladder = {};
  Object.values(rounds).forEach((round) => {
    round.forEach((match) => {
      const result = results[match.id];
      if (result) {
        // fill from result
        const homescore = totalScore(result.score.homeScore);
        const awayscore = totalScore(result.score.awayScore);
        const homeTeam = result.score.homeScore.team;
        const awayTeam = result.score.awayScore.team;
        if (!ladder[homeTeam.id]) {
          ladder[homeTeam.id] = {
            team: homeTeam,
            ...ladderObject,
          };
        }
        if (!ladder[awayTeam.id]) {
          ladder[awayTeam.id] = {
            team: awayTeam,
            ...ladderObject,
          };
        }
        if (homescore === awayscore) {
          // draw
          ladder[homeTeam.id].drawn += 1;
          ladder[awayTeam.id].drawn += 1;
          ladder[homeTeam.id].points += 2;
          ladder[awayTeam.id].points += 2;
        } else {
          const homeVictor = homescore > awayscore;

          ladder[(homeVictor ? homeTeam.id : awayTeam.id)].won += 1;
          ladder[(homeVictor ? awayTeam.id : homeTeam.id)].lost += 1;
          ladder[(homeVictor ? homeTeam.id : awayTeam.id)].points += 4;
        }

        ladder[homeTeam.id].played += 1;
        ladder[awayTeam.id].played += 1;
        ladder[homeTeam.id].for += homescore;
        ladder[awayTeam.id].for += awayscore;
        ladder[homeTeam.id].against += awayscore;
        ladder[awayTeam.id].against += homescore;
      }
    });
  });

  return ladder;
}

const statsObject = {
  played: 0,
  kick: 0,
  handball: 0,
  mark: 0,
  tackle: 0,
  hitout: 0,
  spoil: 0,
  goal: 0,
  behind: 0,
};

export function combineAllStats(results = {}) {
  const resultsArray = Object.values(results);

  const playerStats = {};

  resultsArray.forEach((result) => {
    if (result.stats) {
      const homeStats = Object.values(result.stats.homeTeam || {});
      const awayStats = Object.values(result.stats.awayTeam || {});
      [...homeStats, ...awayStats].forEach((statline) => {
        if (!statline.player) {
          throw new Error('Undefined player for statline!');
        }
        if (!playerStats[statline.player.id]) {
          playerStats[statline.player.id] = { stats: { ...statsObject } };
          playerStats[statline.player.id].player = statline.player;
        }
        playerStats[statline.player.id].stats.played += 1;
        playerStats[statline.player.id].stats.kick += statline.stats.kick || 0;
        playerStats[statline.player.id].stats.handball += statline.stats.handball || 0;
        playerStats[statline.player.id].stats.mark += statline.stats.mark || 0;
        playerStats[statline.player.id].stats.tackle += statline.stats.tackle || 0;
        playerStats[statline.player.id].stats.hitout += statline.stats.hitout || 0;
        playerStats[statline.player.id].stats.spoil += statline.stats.spoil || 0;
        playerStats[statline.player.id].stats.goal += statline.stats.goal || 0;
        playerStats[statline.player.id].stats.behind += statline.stats.behind || 0;
      });
    }
  });

  return playerStats;
}
