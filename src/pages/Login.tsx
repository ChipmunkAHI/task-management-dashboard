import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Importing the login API hook from authApi
import { useLoginUserMutation } from '../services/authApi';

//Importing the Redux function to store the logged-in user
import { setCredentials } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

//Importing the RootState type (so we can check if user is logged in)
import type { RootState } from '../store';

const Login: React.FC = () => {
  //Local state to hold form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //gives the login mutation function and info about its status
  const [loginUser, { isLoading, error, data }] = useLoginUserMutation();

  //Used to dispatch actions to Redux store
  const dispatch = useDispatch();

  //Used to redirect the user after login
  const navigate = useNavigate();

  //Gets the current login status from Redux
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  //If login is successful, store user + token in Redux and redirect
  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data, token: data.token }));
      navigate('/dashboard'); // go to dashboard
    }
  }, [data, dispatch, navigate]);

  //Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page refresh
    try {
      await loginUser({ username, password }).unwrap(); // send login request
    } catch (err) {
      // error is handled by RTK Query
    }
  };

  //If already logged in, don't show login page
    useEffect(() => {
    if (isAuthenticated) {
        navigate("/dashboard");
    }
    }, [isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Login to Task Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            Login failed. Please check your credentials.
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;