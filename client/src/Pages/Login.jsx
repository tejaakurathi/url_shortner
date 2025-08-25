import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authAPI from '../api/AuthApi';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authAPI.get(`/user?name=${username}&password=${password}`);
      console.log('API response:', response.data);

      if (response.data && response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userID', response.data.userID); 
        // Redirect to Home
        navigate('/');
      } else {
        setError(response.data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928DAB] text-white">
      <div className="bg-black bg-opacity-30 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;