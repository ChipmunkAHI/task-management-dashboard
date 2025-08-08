import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  status: string; // e.g., "All", "To Do", "In Progress", "Done"
}

const initialState: FilterState = {
  status: "All",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = filterSlice.actions;
export default filterSlice.reducer;