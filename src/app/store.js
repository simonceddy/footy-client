import { configureStore } from '@reduxjs/toolkit';
import { factoryAPI } from '../features/factory/factoryAPI';
import overview from '../features/overview/overviewSlice';
import league from '../features/league/leagueSlice';

export const store = configureStore({
  reducer: {
    [factoryAPI.reducerPath]: factoryAPI.reducer,
    overview,
    league,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(factoryAPI.middleware)
});
