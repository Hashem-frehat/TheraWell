import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const HomePage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <main className="p-6">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6">Admin Dashboard</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;