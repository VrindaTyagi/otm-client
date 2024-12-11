// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col ">
      <div className="relative grow">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
};

export default MainLayout;
