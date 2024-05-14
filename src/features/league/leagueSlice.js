import { createSlice } from '@reduxjs/toolkit';

export const tabs = {
  LADDER: 'LADDER',
  FIXTURE: 'FIXTURE',
  TEAMS: 'TEAMS',
  PLAYERS: 'PLAYERS',
};

const initialState = {
  viewingTeam: null,
  results: {},
  ladder: {},
  tab: tabs.TEAMS
};

export const leagueSlice = createSlice({
  name: 'league',
  initialState,
  reducers: {
    setLadder(state, action) {
      state.ladder = action.payload;
    },
    updateTeamRecord(state, action) {
      if (state.ladder[action.payload.teamId]) {
        state.ladder[action.payload.teamId] = {
          ...state.ladder[action.payload.teamId],
          ...action.payload
        };
      }
    },
    setViewingTeam(state, action) {
      state.viewingTeam = action.payload;
    },
    setResult(state, action) {
      state.results[action.payload.id] = action.payload;
    },
    clearResults(state) {
      state.results = {};
    },
    setTab(state, action) {
      state.tab = action.payload;
    },
    clearState() {
      return initialState;
    }
  },
});

export const {
  setViewingTeam, setResult, clearResults, setLadder, clearState, setTab
} = leagueSlice.actions;

export default leagueSlice.reducer;
