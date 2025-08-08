//Importing the necessary tools from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

//Defining the shape of the auth state
interface AuthState {
  user: {
    username: string;
    id: number;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

//Defining the initial state for the auth slice
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

//Creating the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth', // Name of the slice (shows in Redux DevTools)

  initialState, // The default state

  reducers: {
    //Reducer to log the user in (store user + token)
    setCredentials: (
      state,
      action: PayloadAction<{
        user: { username: string; id: number };
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    //Reducer to log the user out (clear state)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

//Export actions to use in your components (e.g., dispatch(setCredentials(...)))
export const { setCredentials, logout } = authSlice.actions;

//Export the reducer to add to the Redux store
export default authSlice.reducer;