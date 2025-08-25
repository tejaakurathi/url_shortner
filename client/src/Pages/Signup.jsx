import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/AuthApi'; // 👈 Import your auth API

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authApi.post('/user', {
        name: username,
        email,
        password,
        address,
      });
      console.log('Signup successful:', res.data);
      navigate('/login');
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1f1c2c] to-[#928DAB] text-white">
      <div className="bg-black bg-opacity-30 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-600 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
