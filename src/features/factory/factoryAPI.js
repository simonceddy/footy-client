import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { serverUrl } from '../../helpers';

export const factoryAPI = createApi({
  reducerPath: 'factoryAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${serverUrl()}/api` }),
  endpoints: (builder) => ({
    getGeneratedMatchup: builder.query({
      query: () => '/factory/match'
    }),
    getGeneratedLeague: builder.query({
      query: () => '/factory/league'
    }),
  })
});

export const { useGetGeneratedMatchupQuery, useGetGeneratedLeagueQuery } = factoryAPI;
