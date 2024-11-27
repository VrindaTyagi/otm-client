import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

export function AdminDashboard() {
  const { adminLogout, login } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.code?.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const jwt = Cookies.get('adminJwt');
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/members/active`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(`Failed to fetch users: ${err.message}`);
      setLoading(false);
    }
  };
  const handleLogout = () => {
    adminLogout();
    navigate('/admin-login');
  };

  const handleUserLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.removeItem('profilePicture');
    localStorage.removeItem('isLegend');
    navigate('/home');
  };

  if (loading)
    return (
      <Loader className={'fixed left-0 top-0 z-[200] h-screen bg-black'} />
    );
  if (error)
    return (
      <div className="fixed left-0 top-0 z-[200] h-screen w-full bg-black">
        <Error>Some Error Occurred</Error>
      </div>
    );

  return (
    <div className="bg-gray-900 min-h-screen p-4 text-white md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <h1 className="mb-4 text-3xl font-bold md:mb-0">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 focus:shadow-outline rounded px-4 py-2 font-bold text-white focus:outline-none"
          >
            Logout
          </button>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg md:p-6">
          <h2 className="mb-4 text-2xl font-semibold">Active Users</h2>
          <input
            type="text"
            placeholder="Search users..."
            className="bg-gray-700 mb-4 w-full rounded p-2 text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li
                key={user.code}
                className="bg-gray-700 flex flex-col items-start justify-between rounded-lg p-4 md:flex-row md:items-center"
              >
                <div className="mb-2 md:mb-0">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-300 text-sm">{user.email}</p>
                  <p className="text-gray-400 text-xs">Code: {user.code}</p>
                </div>
                <button
                  onClick={() => handleUserLogin(user)}
                  className="bg-green-600 hover:bg-green-700 focus:shadow-outline mt-2 rounded px-4 py-2 font-bold text-white focus:outline-none md:mt-0"
                >
                  Login as User
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
