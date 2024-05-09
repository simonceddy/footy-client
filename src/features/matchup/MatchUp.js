import { useEffect } from 'react';
import { useGetGeneratedMatchupQuery } from '../factory/factoryAPI';
import Overview from '../overview/Overview';
import { renderTeamFromContainer } from '../../helpers';

function MatchUp() {
  const {
    data, isSuccess, isFetching, refetch
  } = useGetGeneratedMatchupQuery();

  // console.log(data);

  useEffect(() => {
    if (isSuccess && data && data.homeTeamContainer?.team && data.awayTeamContainer?.team) {
      document
        .getElementsByTagName('title')[0]
        .innerHTML = `${renderTeamFromContainer(data.homeTeamContainer)} VS ${renderTeamFromContainer(data.awayTeamContainer)}`;
    }
  }, [data]);

  return (
    <>
      {isFetching && <span>Fetching data...</span>}
      {isSuccess && (
        <Overview match={data}>
          <button
            className="p-1 absolute top-1 left-1 border-2 rounded-lg border-blue-500 hover:border-yellow-500 active:border-green-500"
            type="button"
            onClick={() => refetch()}
          >
            Regenerate
          </button>
        </Overview>
      )}
    </>
  );
}

export default MatchUp;
