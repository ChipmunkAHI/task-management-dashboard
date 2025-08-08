import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query service for managing tasks
export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    // GET /todos
    getTasks: builder.query({
      query: () => '/todos/user/5',
      providesTags: (result) =>
        result
          ? [
              ...result.todos.map(({ id }: any) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),

    // POST /todos/add
    addTask: builder.mutation({
      query: (newTask) => ({
        url: "/todos/add",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // PUT /todos/:id
    updateTask: builder.mutation({
      query: (task) => ({
        url: `/todos/${task.id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: (_result, _error, task) => [{ type: 'Tasks', id: task.id }],
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/todos/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, taskId) => [
        { type: 'Tasks', id: taskId },
        { type: 'Tasks', id: 'LIST' },
      ],
    }),


  }),


});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;