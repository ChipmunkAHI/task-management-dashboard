import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const initialState: Task[] = [];

const localTasksSlice = createSlice({
  name: "localTasks",
  initialState,
  reducers: {
    addLocalTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    updateLocalTask: (state, action: PayloadAction<Task>) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteLocalTask: (state, action: PayloadAction<number>) => {
      return state.filter(task => task.id !== action.payload);
    },
    clearLocalTasks: () => {
      return [];
    },
  },
});

export const { addLocalTask, updateLocalTask, deleteLocalTask, clearLocalTasks } = localTasksSlice.actions;
export default localTasksSlice.reducer;