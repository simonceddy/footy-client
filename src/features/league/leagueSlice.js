import { createSlice } from '@reduxjs/toolkit';

export const leagueSlice = createSlice({
  name: 'league',
  initialState: {
    viewingTeam: null,
    results: {}
  },
  reducers: {
    setViewingTeam(state, action) {
      state.viewingTeam = action.payload;
    },
    setResult(state, action) {
      state.results[action.payload.id] = action.payload;
    },
    clearResults(state) {
      state.results = {};
    }
  },
});

export const { setViewingTeam, setResult, clearResults } = leagueSlice.actions;

export default leagueSlice.reducer;
