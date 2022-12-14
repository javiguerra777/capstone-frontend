import { createSlice } from '@reduxjs/toolkit';

type User = {
  docId: string;
  username: string;
  name: string;
  email: string;
  host: boolean;
  loggedIn: boolean;
  connected: boolean;
  x: number;
  y: number;
};

const initialState = {
  docId: '',
  username: '',
  name: '',
  email: '',
  host: false,
  loggedIn: false,
  connected: false,
  x: 0,
  y: 0,
} as User;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // used for signing up user, logging in user, and logging user out of app
    setUser(state, { payload }) {
      state.docId = payload.id;
      state.username = payload.username;
      state.name = payload.name;
      state.email = payload.email;
      state.loggedIn = !state.loggedIn;
    },
    setConnected(state) {
      state.connected = true;
    },
    setCoords(state, { payload }) {
      state.x = payload.x;
      state.y = payload.y;
    },
    updateUsername(state, { payload }) {
      state.username = payload;
    },
  },
});

export const { setUser, setConnected, setCoords, updateUsername } =
  userSlice.actions;
export default userSlice.reducer;
