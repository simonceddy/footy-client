import { createSlice } from '@reduxjs/toolkit';

export const overviewSlice = createSlice({
  name: 'overview',
  initialState: {
    showAwayTeam: false
  },
  reducers: {
    toggleShowTeam(state) {
      state.showAwayTeam = !state.showAwayTeam;
    },
    setAwayTeamShown(state) {
      state.showAwayTeam = true;
    },
    setHomeTeamShown(state) {
      state.showAwayTeam = false;
    },
  },
});

export const { toggleShowTeam, setAwayTeamShown, setHomeTeamShown } = overviewSlice.actions;

export default overviewSlice.reducer;
