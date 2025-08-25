// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Copy } from 'lucide-react';
import UrlAPI from '../api/UrlApi';
import AnalysisUrlApi from '../api/AnalysisUrlApi';

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrls, setShortUrls] = useState([]);
  const navigate = useNavigate();

const fetchUrls = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId =localStorage.getItem('userID');
    console.log('token:', token);
    console.log('userID:', userId);
    const urlget = { userID: userId };
    const res = await axios.get('http://localhost:3002/api/urls', { params: urlget });

    setShortUrls(res.data.urls);
  } catch (err) {
    console.error('Failed to fetch URLs', err);
  }
};

  const shortenUrl = async () => {
  const userID = localStorage.getItem('userID');

  try {
    if(!userID){
      navigate('/login');
      return;
    }
    const urlpost = { orgurl: originalUrl,userID:userID };
    const response = await UrlAPI.post('/shortenurl', urlpost);

    console.log('Shortened URL:', response.data);
    fetchUrls();
  } catch (err) {
    console.error('Shorten failed', err);
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login');
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white px-6 py-10 font-sans">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-orange-500">Url Shortener</h2>
        <div className="space-x-4">
          {localStorage.getItem('token') ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="px-4 py-2 bg-transparent border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => navigate('/signup')}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hero */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 inline-block text-transparent bg-clip-text">
          Shorten Your Loooong Links :)
        </h1>
        <p className="mt-2 text-gray-400">
          Create short urls effeiciently and tracking.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="Enter the link here"
            className="w-[400px] p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button
            onClick={shortenUrl}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
          >
            Shorten Now!
          </button>
        </div>
      </div>

      {/* Links Table */}
      <div className="mt-10 bg-gray-900 rounded-xl p-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="pb-2">Short Link</th>
              <th className="pb-2">Original Link</th>
              <th className="pb-2">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {shortUrls.map((url, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <a href={`http://localhost:3002/api/${url.shortendurl}`} className="text-blue-400" target="_blank">
                      http://localhost:3002/{url.shortendurl}
                    </a>
                    <Copy
                      className="w-4 cursor-pointer hover:text-white"
                      onClick={() => navigator.clipboard.writeText(`http://localhost:3002/${url.shortendurl}`)}
                    />
                  </div>
                </td>
                <td className="py-2">
                  <a
                    href={url.orgurl}
                    className="text-gray-300 max-w-[200px] truncate inline-block"
                    target="_blank"
                  >
                    {url.orgurl}
                  </a>
                </td>
                <td className="py-2">{url.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}