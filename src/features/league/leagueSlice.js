import { createSlice } from '@reduxjs/toolkit';

export const leagueSlice = createSlice({
  name: 'league',
  initialState: {
    viewingTeam: null
  },
  reducers: {
    setViewingTeam(state, action) {
      state.viewingTeam = action.payload;
    }
  },
});

export const { setViewingTeam } = leagueSlice.actions;

export default leagueSlice.reducer;
