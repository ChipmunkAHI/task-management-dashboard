//Importing createApi and fetchBaseQuery from Redux Toolkit Query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//Making a new API slice using createApi
export const authApi = createApi({
  // This is the name of the API slice in Redux DevTools
  reducerPath: 'authApi',

  //base URL Set Up for all endpoints in this API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com', 
  }),

  //Defining the available endpoints (in this case: login)
  endpoints: (builder) => ({
    // mutation definition (used for POST, PUT, DELETE requests)
    loginUser: builder.mutation({
      //Query function that takes input and returns the request config
      query: (credentials) => ({
        url: '/auth/login',   
        method: 'POST',       
        body: credentials     
      })
    })
  })
});


export const { useLoginUserMutation } = authApi;