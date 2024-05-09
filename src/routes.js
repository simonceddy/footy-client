import League from './features/league/League';
import MatchUp from './features/matchup/MatchUp';

const routes = [
  {
    path: 'league',
    element: <League />
  },
  {
    path: 'matchup',
    element: <MatchUp />
  }
];

export default routes;
