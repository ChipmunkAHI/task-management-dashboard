import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import filterReducer from "./features/filter/filterSlice";
import { authApi } from "./services/authApi";
import { taskApi } from "./services/taskApi"; 
import localTasksReducer from './features/tasks/localTasksSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filter: filterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer, 
    localTasks: localTasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware), 
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;