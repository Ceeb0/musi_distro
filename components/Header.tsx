import React, { useState } from 'react';
import { User, View } from '../types';
import { ChevronDownIcon, LogoIcon } from './IconComponents';
import { ThemeToggleButton } from './ThemeToggleButton';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  setView: (view: View) => void;
  currentView: View;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout, setView, currentView }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const NavLink: React.FC<{ view: View, label: string }> = ({ view, label }) => (
      <a onClick={() => setView(view)} className={`text-sm font-medium transition-colors ${currentView === view ? 'text-brand-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'} cursor-pointer`}>
          {label}
      </a>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div onClick={() => setView('marketplace')} className="flex items-center space-x-3 cursor-pointer">
                <LogoIcon className="w-8 h-8" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    CACS<span className="text-brand-500">distro</span>
                </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink view="marketplace" label="Marketplace" />
              <NavLink view="collaborationHub" label="Collaboration Hub" />
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                    <a onClick={() => { setView(user.role === 'producer' ? 'producerDashboard' : 'artistDashboard'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Dashboard</a>
                    <a onClick={() => { setView('earnings'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Earnings</a>
                    {user.role === 'producer' && <a onClick={() => { setView('producerProfile'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">My Profile</a>}
                    <a onClick={() => { setView('profileSettings'); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Profile Settings</a>
                    <a onClick={() => { onLogout(); setDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Logout</a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setView('signup')}
                  className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-md hover:bg-brand-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
